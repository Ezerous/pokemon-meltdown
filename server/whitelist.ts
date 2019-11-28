import {FS} from '../lib/fs';

const USERGROUPS_FILE = 'config/usergroups.csv';
const WHITELIST_FILE = 'config/whitelist.tsv';

export const Whitelist = new class {
	readonly userIds: ID[] = [];
	readonly adminIds: ID[] = [];

	constructor() {
		setImmediate(() => {
			void Whitelist.loadWhitelist();
		});
	}

	// config/whitelist.tsv contains all the whitelisted ids line by line
	async loadWhitelist() {
		if (Config.whitelistEnabled) {
			const userGroups = Object.create(null);
			FS(USERGROUPS_FILE).readIfExists().then(data => {
				for (const row of data.split("\n")) {
					if (!row) continue;
					const cells = row.split(",");
					userGroups[toID(cells[0])] = (cells[1] || Config.groupsranking[0]) + cells[0];
				}
				const ids = Object.keys(userGroups);
				for (const id of ids) {
					const group = userGroups[id].charAt(0);
					if (Config.groups[group] && Config.groups[group].root) {
						this.adminIds.push(toID(id));
					}
				}
			});
			FS(WHITELIST_FILE).readIfExists().then(data => {
				if (!data) return;
				for (const row of data.split("\n")) {
					if (!row || row === '\r') continue;
					const id = toID(row.trim());
					this.userIds.push(id);
				}
			});
		}
	}

	isWhitelisted(id: ID) {
		if (Config.whitelistEnabled) {
			return ((Whitelist.adminIds.includes(id) || Whitelist.userIds.includes(id)));
		}
		return true;
	}

	whitelist(username: string) {
		const id = toID(username);
		if (!this.isWhitelisted(id)) {
			this.userIds.push(id);
			FS(WHITELIST_FILE).append(id + '\r\n');
			return true;
		}
		return false;
	}

	unWhitelist(username: string) {
		const id = toID(username);
		for (let i = 0; i < this.userIds.length; i++) {
			if (this.userIds[i] === id) {
				this.userIds.splice(i, 1);
				FS(WHITELIST_FILE).writeUpdate(() => {
					let buf = '';
					for (const userId of Whitelist.userIds) {
						buf += userId + '\r\n';
					}
					return buf;
				});
				return true;
			}
		}
		return false;
	}

	visualizeWhitelist() {
		let buf = "Currently whitelisted userIds (excluding admins):\n";
		for (const userId of this.userIds) {
			buf += `${userId}\n`;
		}
		return buf;
	}
}();

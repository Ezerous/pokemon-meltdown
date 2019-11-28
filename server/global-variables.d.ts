import * as ChatType from './chat';
import * as RoomlogsType from './roomlogs';
import * as RoomsType from './rooms';
import * as SocketsType from './sockets';
import * as TeamValidatorAsyncType from './team-validator-async';
import * as UsersType from './users';
import * as VerifierType from './verifier';

import * as ConfigType from "../config/config-example";

import * as StreamsType from '../lib/streams';

import {IPTools as IPToolsType} from './ip-tools';
import {Ladders as LaddersType} from './ladders';
import {LadderStore as LadderStoreType} from './ladders-remote';
import {LoginServer as LoginServerType} from './loginserver';
import {Monitor as MonitorType} from './monitor';
import {Punishments as PunishmentsType} from './punishments';
import {Tournaments as TournamentsType} from './tournaments';
import {Whitelist as WhitelistType} from './whitelist';

declare global {
	namespace NodeJS {
		interface Global {
			IPTools: any;
			Config: any;
			Chat: any;
			Tournaments: any;
			LoginServer: any;
			Punishments: any;
			Whitelist: any;
			__version: {head: string, origin?: string, tree?: string};
		}
	}
	const Config: typeof ConfigType & AnyObject;
	const Chat: typeof ChatType.Chat;
	const IPTools: typeof IPToolsType;
	const Ladders: typeof LaddersType;
	const LadderStoreT: typeof LadderStoreType;
	const LoginServer: typeof LoginServerType;
	const Monitor: typeof MonitorType;
	const Punishments: typeof PunishmentsType;
	const Whitelist: typeof WhitelistType;
	const Sockets: typeof SocketsType;
	const TeamValidatorAsync: typeof TeamValidatorAsyncType;
	const Rooms: typeof RoomsType.Rooms;
	const Tournaments: typeof TournamentsType;
	const Roomlogs: typeof RoomlogsType.Roomlogs;
	const Users: typeof UsersType.Users;
	const Verifier: typeof VerifierType;
}

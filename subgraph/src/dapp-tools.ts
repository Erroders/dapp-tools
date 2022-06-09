import { RegisterToken } from '../generated/DappTools/DappTools';
import {
    AccessControl,
    DappToolsRegisteredERC20,
    DappToolsRegisteredERC1155,
    DappToolsRegisteredERC721,
    Ownable,
    Pausable,
} from '../generated/templates';

export function handleRegisterToken(event: RegisterToken): void {
    switch (event.params.kind) {
        case 0:
            DappToolsRegisteredERC20.create(event.params.contract_address);
            break;
        case 1:
            DappToolsRegisteredERC721.create(event.params.contract_address);
            break;
        case 2:
            DappToolsRegisteredERC1155.create(event.params.contract_address);
            break;
        // For super token, needs modifications as per superfluid subgraph template
        case 3:
            DappToolsRegisteredERC20.create(event.params.contract_address);
            break;
    }
    AccessControl.create(event.params.contract_address);
    Ownable.create(event.params.contract_address);
    Pausable.create(event.params.contract_address);
}

declare let _: any;

export abstract class UserAbstractModel implements IUser {
    passport: number;
    phone: string;

    constructor(attr?: object) {
        attr = _.assign({}, attr);

        this.passport = attr['passport'] || 0;
        this.phone = attr['phone'] || "";
    }
}
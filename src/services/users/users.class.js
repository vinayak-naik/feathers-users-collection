const { Service } = require("feathers-mongoose");

exports.Users = class Users extends Service {
  constructor(options, app) {
    super(options, app);
    this.app = app;
  }

  async create(data, params) {
    const { name, email, password, address } = data;
    const userDetails = {
      name,
      email,
      password,
    };

    const userDetail = await super.create(userDetails);
    const addressDetails = {
      id: userDetail._id,
      address,
    };
    const userAddress = await this.app
      .service("address")
      .create(addressDetails);
    userDetail.address = userAddress.address;
    return {
      userDetail,
    };
  }

  async get(id, params) {
    let oldResponse = await super.get(id, params);
    let newResponse = await this.app.service("address").find(id);
    const addr = newResponse.map((item) => {
      return item.address;
    });
    oldResponse.address = addr[0];
    return {
      total: oldResponse.total,
      limit: oldResponse.limit,
      skip: oldResponse.skip,
      data: oldResponse,
    };
  }

  async update(id, data, params) {
    const { name, email, password, address } = data;
    const newUserDetails = {
      name,
      email,
      password,
    };
    const newUserDetail = await super.update(id, newUserDetails);
    const newAddressDetails = {
      id,
      address,
    };

    const updatedAddress = await this.app
      .service("address")
      .update(id, newAddressDetails);
    newUserDetail.address = updatedAddress.address;

    return {
      newUserDetail,
    };
  }

  async remove(id){
    const removedUser= await super.remove(id)
    const updatedAddress = await this.app.service("address").remove(id);
    removedUser.address=updatedAddress.address
    return {
        removedUser
      };
  }
};

const { Service } = require("feathers-mongoose");

exports.Address = class Address extends Service {
  async find(id) {
    const findAddress = await super.find({ query: { id } });
    return findAddress.data;
  }

  async update(id,address) {
    
    const findId= await super.find({ query: { id } });
    const addrId=findId.data[0]._id
    return await super.update(addrId,address);
  }
  async remove(id) {
    
    const findId= await super.find({ query: { id } });
    const addrId=findId.data[0]._id
    return await super.remove(addrId);
  }
};

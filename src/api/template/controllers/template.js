'use strict';

/**
 *  template controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

//module.exports = createCoreController('api::template.template');
module.exports = createCoreController('api::template.template', ({ strapi }) => ({

  async find(ctx) {
    // some custom logic here
    ctx.query = { ...ctx.query, local: 'en', populate : 'deep', pagination : {limit : -1} };

    // Calling the default core action
    const { data } = await super.find(ctx);

    const returnData = data.map(( templateRow ) => {
      const { attributes: currentData, id: currentId } = templateRow;
      const defaultType = 'Uri';
      const thumbnailUrl = currentData.thumbnail?.refName?.data?.attributes?.url;
      const imgUrl = currentData.img?.refName?.data?.attributes?.url;
      return {
        id : currentData.cid,
        uid : currentId,
        active : currentData.active,
        unlockType : currentData.unlockType,
        userType : currentData.userType,
        tag : currentData.tag,
        thumbnail : {
          type : (currentData.thumbnail?.type == null) ? defaultType : currentData.thumbnail?.type,
          refName : thumbnailUrl == null ? '' : thumbnailUrl
        },
        ratio : currentData.ratio,
        json : currentData.json
      };
    });
    return returnData;
  }
}));

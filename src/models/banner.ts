import { model, Schema } from 'mongoose';

import { ERROR_MESSAGES } from './config';
import { URL_REGEX } from '../config/config';
import { Banner, IBanner } from './modelTypes';

const bannerSchema = new Schema({
  date: {
    type: Date,
    default: new Date(),
  },
  image: {
    type: String,
    required: [true, ERROR_MESSAGES.REQUIRE('Image')],
    validate: {
      validator: function (image: string) {
        return URL_REGEX.test(image);
      },
      message: ERROR_MESSAGES.URL('Image'),
    },
  },
});

bannerSchema.statics.IsBannerExist = async function (data) {
  const banner = await this.findOne(data);

  return !!banner;
};

export default model<Banner, IBanner>('Banner', bannerSchema);

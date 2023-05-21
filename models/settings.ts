import {Schema, model, models} from 'mongoose';

const SettingsSchema = new Schema({
  baseUrl: {
    type: String,
    required: [false],
  },
  media: {
    type: String,
    required: [false],
  },
  version: {
    type: String,
    required: [false],
  },
});

const Settings = models.Settings || model('Settings', SettingsSchema);

export default Settings;

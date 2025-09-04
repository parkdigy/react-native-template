import {getInstallations, getId as fbGetId} from '@react-native-firebase/installations';

const installations = getInstallations();

export default {
  getId(): Promise<string> {
    return fbGetId(installations);
  },
};

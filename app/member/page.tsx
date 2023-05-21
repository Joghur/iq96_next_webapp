// import {connectToDB} from '@utils/database';
// import Settings from '@models/settings';
import ProfilePage from './profile/page';
import {useEffect, useState} from 'react';

// const makeVersion = async () => {
//   try {
//     await connectToDB();
//     const newSettings = new Settings({version: '0.6.2'});
//     await newSettings.save();
//     return true;
//   } catch (error) {
//     console.log(error);
//     return false;
//   }
// };

// const getVersion = async () => {
//   try {
//     await connectToDB();
//     return Settings.find({}).populate('version');
//   } catch (error) {
//     console.log(error);
//     return false;
//   }
// };

const MemberPage = () => {
  // const [settings, setSettings] = useState<any>(null);

  // const doDb = async () => {
  //   setSettings(getVersion());
  //   makeVersion();
  // };

  // useEffect(() => {
  //   doDb();
  // }, []);

  return (
    <>
      <p>Med-lems side</p>
      <ProfilePage />
    </>
  );
};

export default MemberPage;

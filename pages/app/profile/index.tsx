import AppLayout from '@/modules/App/Layout';
import React, { ReactElement } from 'react'
import ProfileSidebar from '../../../modules/App/Profile/Sidebar/index';

const ProfilePage = () => {
  return (
    <div className="mt-12 text-base pr-[60px] grid grid-flow-col lg:grid-cols-5">
      <div className="col-span-1">
        <ProfileSidebar active="1" />
      </div>
      <div className="p-[40px] col-span-4 grid grid-flow-row lg:grid-cols-3">
      </div>
    </div>
  );
}
ProfilePage.getLayout = (page: ReactElement) => <AppLayout>{page}</AppLayout>;


export default ProfilePage
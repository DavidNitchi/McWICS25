import React from 'react';
import MainButton from './Buttons/mainButton';

export default function Main() {
    return (
      <ul className="space-y-4 justify-center items-center flex flex-col min-h-screen ">
        <MainButton
          text="Profile"
          link="/profile"
        />
        <MainButton
          text="CV Creation"
          link="/cvCreation"
        />
        <MainButton
          text="New Jobs Today"
          link="/newJobs"
        />
      </ul>
    );
  }
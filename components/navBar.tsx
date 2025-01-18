import React from 'react';
import NavButton from './Buttons/navButton';
import Link from "next/link";

const navBar: React.FC = () => {
    return (
        <nav className="flex w-full bg-white justify-between sticky top-0 z-50 p-5 shadow-md font-mono">
            <Link className='text-3xl font-bold' href="/">BCV</Link>
            <ul className='flex self-end space-x-9'>
                <NavButton text="profile" link="/profile" />
                <NavButton text="cv creation" link="/cvCreation" />
                <NavButton text="new jobs today" link="/newJobs" />
            </ul>
      </nav>
    )
}

export default navBar;
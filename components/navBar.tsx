import React from 'react';
import NavButton from './Buttons/navButton';
import Link from "next/link";
import { logout } from '@/db/auth';

const navBar: React.FC = () => {
    return (
        <nav className="flex w-full bg-white justify-between sticky top-0 z-50 p-5 shadow-md font-mono">
            <Link className='text-3xl font-bold' href="/">BCV</Link>
            <ul className='flex self-end space-x-9'>
                <NavButton text="profile" link="/profile" />
                <NavButton text="cv_creation" link="/cvCreation" />
                <NavButton text="new_jobs_today" link="/newJobs" />
                <NavButton text="logout" link="#" onClick={logout} /> 
            </ul>
      </nav>
    )
}

export default navBar;
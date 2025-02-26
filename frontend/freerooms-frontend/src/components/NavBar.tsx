import { Search, Map, GridView, DarkMode } from '@mui/icons-material';
import { useState } from 'react';

export default function NavBar() {
  const [isDoorOpen, setIsDoorOpen] = useState(true);

  const toggleDoor = () => {
    setIsDoorOpen((prev_bool) => !prev_bool);
  }

  return (
    <nav className='flex items-start justify-between border-b-1 border-gray-300 px-4'>
      <div className='flex gap-0.5 py-1 cursor-pointer' onClick={toggleDoor}>
        <img
          src={isDoorOpen ? '/assets/freeRoomsLogo.png' : '/assets/freeroomsDoorClosed.png'}
          alt='Freerooms Logo'
          className='h-12.5'
        />
        <span className='font-semibold text-[2rem] text-orange-500'>Freerooms</span>
      </div>

      <div className='flex items-center gap-2 text-orange-500 py-3'>
        <Search
          style={{ fontSize: '2.5rem' }}
          className='border border-orange-400 rounded-sm p-2'
        />
        <GridView
          style={{ fontSize: '2.5rem' }}
          className='text-white bg-orange-500 rounded-sm p-2'
        />
        <Map
          style={{ fontSize: '2.5rem' }}
          className='border border-orange-400 rounded-sm p-2'
        />
        <DarkMode
          style={{ fontSize: '2.5rem' }}
          className='border border-orange-400 rounded-sm p-2'
        />
      </div>
    </nav>
  );
};

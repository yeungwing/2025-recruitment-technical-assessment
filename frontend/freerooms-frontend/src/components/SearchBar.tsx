import { Search } from '@mui/icons-material';

export default function SearchBar() {
  return (
    <form className='flex items-center border border-gray-300 gap-2 rounded-md px-3 py-2.5 w-full sm:max-w-md md:max-w-lg lg:max-w-3xl'>
      <Search className='text-gray-500' />
      <input
        type='text'
        placeholder='Search for a building...'
        className='text-gray-900'
      />
    </form>

  );
};
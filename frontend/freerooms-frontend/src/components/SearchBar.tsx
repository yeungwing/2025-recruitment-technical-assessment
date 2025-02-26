import { Search } from '@mui/icons-material';

export default function SearchBar() {
  return (
    <form className='flex items-center border border-gray-300 gap-2 rounded-md py-2.5 w-full max-w-3xl px-3'>
      <Search className='text-gray-500' />
      <input
        type='text'
        placeholder='Search for a building...'
        className='text-gray-900'
      />
    </form>

  );
};
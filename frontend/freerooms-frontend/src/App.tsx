import { FilterAlt, FilterList } from '@mui/icons-material';
import NavBar from './components/NavBar';
import OptionButton from './components/OptionButton';
import SearchBar from './components/SearchBar';
import BuildingGrid from './components/BuildingGrid';

function App() {
  return (
    <>
      <NavBar />

      <div className='flex justify-between items-center my-4 mx-6'>
        <OptionButton icon={<FilterAlt />} text='Filters' />
        <SearchBar />
        <OptionButton icon={<FilterList />} text='Sort' />
      </div>

      <BuildingGrid />
    </>
  )
}

export default App

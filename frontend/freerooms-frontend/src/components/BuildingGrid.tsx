import BuildingCard from "./BuildingCard";
import buildings from '../data.json';

export default function BuildingGrid() {
  return (
    <div className='grid grid-cols-5 gap-5 px-6'>
      {buildings.map((building) => (
        <BuildingCard
          name={building.name}
          rooms_available={building.rooms_available}
          image={`/assets/${(
            building.building_file || building.building_picture || 'freeRoomsLogo.png'
          ).replace('./', '')}`}
        />
      ))}
    </div>
  );
};
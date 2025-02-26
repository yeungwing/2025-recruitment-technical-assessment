interface BuildingCardProps {
  name: string;
  rooms_available: number;
  image: string;
}

export default function BuildingCard(
  { name, rooms_available, image }: BuildingCardProps
) {
  return (
    <div className='relative h-96 rounded-lg overflow-hidden'>
      <img 
        src={image}
        alt={name}
        className='h-full object-cover'
      />

      <div className='absolute top-2.5 right-2.5 flex items-center bg-white rounded-xl px-3.5 pt-2 pb-2.5'>
        <div className='w-2.5 h-2.5 bg-green-600 rounded-full mr-2 relative top-[1px]' />
        <span className='text-black text-[12.5px] font-semibold'>
          {rooms_available} rooms available
        </span>
      </div>

      <div
        className='absolute bottom-2.5 left-2.5 right-2.5 bg-orange-500 rounded-lg pb-4 pt-3.5 pl-5 font-semibold text-white'>
        {name}
      </div>
    </div>
  );
};
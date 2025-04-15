import { CreditsMember } from '@/types/Movie';
import { filePathToImage } from '@/utils/filePathToImage';
import Image from 'next/image';
import placeholder_pp from '../../../../public/placeholder_pp.jpg';

interface Props {
  movieCast: CreditsMember[];
}

const MovieCreditsGrid = ({ movieCast }: Props) => {
  return (
    <div className="mt-10">
      <h2 className="mb-4 text-2xl font-bold">Cast</h2>
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {movieCast.slice(0, 10).map((member, index: number) => (
          <div key={index} className="rounded-xl bg-white/10 p-1 text-center backdrop-blur">
            <Image
              alt={member.original_name}
              src={member.profile_path ? filePathToImage(member.profile_path) : placeholder_pp}
              height={320}
              width={300}
              quality={80}
            />
            <div className="mt-1">
              <h4 className="font-semibold">{member.original_name}</h4>
              <p className="text-sm text-gray-300">{member.character}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieCreditsGrid;

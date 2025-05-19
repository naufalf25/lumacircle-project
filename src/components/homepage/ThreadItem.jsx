import React from 'react';
import { BiLike, BiDislike, BiSolidLike, BiSolidDislike } from 'react-icons/bi';
import { RiShareForwardLine, RiShareForwardFill } from 'react-icons/ri';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { FaComment, FaRegComment } from 'react-icons/fa';
import Button from '../Button';
import { Link } from 'react-router';

function ThreadItem() {
  return (
    <div className="w-full rounded-xl bg-white p-4 shadow-lg md:p-6">
      <div className="flex items-start gap-4">
        <div className="flex flex-col items-center justify-start gap-12">
          <div className="bg-primary rounded-full px-3 py-2 text-white">
            <p className="font-semibold">TE</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Button className="hover:opacity-70">
              <FaChevronUp className="text-2xl" title="Upvote Thread" />
            </Button>
            <p className="text-lg">0</p>
            <Button className="hover:opacity-70">
              <FaChevronDown className="text-2xl" title="Downvote Thread" />
            </Button>
          </div>
        </div>
        <div>
          <p className="text-lg">Test 123 User</p>
          <div className="mt-2">
            <Link to="#" className="hover:text-primary text-lg font-semibold">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minus,
              sunt.
            </Link>
            <p className="mt-2">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci
              qui facere a atque sint tempora delectus velit natus illum
              officiis obcaecati quia doloremque, praesentium suscipit inventore
              ut repellendus ipsa facilis? Ab quibusdam sapiente consequatur
              cumque incidunt, magnam in illum placeat.
            </p>
          </div>
          <div className="mt-2 flex items-center gap-2">
            <p className="rounded-md border border-slate-700 px-2 py-1 text-sm text-slate-700 italic">
              #diskusi
            </p>
            <p className="rounded-md border border-slate-700 px-2 py-1 text-sm text-slate-700 italic">
              #lorem
            </p>
          </div>
          <div className="mt-4">
            <div className="flex items-center gap-4">
              <FaRegComment className="text-2xl" />
              <p>
                <span>0</span> Komentar
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ThreadItem;

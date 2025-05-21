import PropTypes from 'prop-types';
import React from 'react';
import Button from '../Button';

function CategoryLists({ categoryState, threads, filterThreadsHandler }) {
  const categories = [...new Set(threads.map((thread) => thread.category))];

  return (
    <div className="flex items-center gap-4 rounded-lg bg-white p-4 shadow-lg lg:px-10">
      {categories.map((category) => (
        <Button
          onClick={(event) =>
            filterThreadsHandler({ event, targetCategory: category })
          }
          className={`rounded-lg border px-2 py-1 text-sm italic ${category === categoryState ? 'border-primary bg-primary text-white' : 'text-slate-500'}`}
        >
          #{category}
        </Button>
      ))}
    </div>
  );
}

CategoryLists.propTypes = {
  categoryState: PropTypes.string.isRequired,
  threads: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      createdAt: PropTypes.number.isRequired,
      ownerId: PropTypes.string.isRequired,
      upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
      downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
      totalComments: PropTypes.number.isRequired,
    }),
  ).isRequired,
  filterThreadsHandler: PropTypes.func.isRequired,
};

export default CategoryLists;

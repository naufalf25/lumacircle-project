import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';
import { motion } from 'motion/react';

function CategoryLists({ categoryState, threads, filterThreadsHandler }) {
  const categories = [...new Set(threads.map((thread) => thread.category))];

  const categoryMotionContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.5,
      },
    },
  };

  const categoryMotionItem = {
    hidden: { opacity: 0, x: 100 },
    show: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={categoryMotionContainer}
      className="flex w-full flex-wrap items-center gap-4 rounded-lg bg-white p-4 shadow-lg lg:px-10"
    >
      {categories.map((category, index) => (
        <motion.div key={index} variants={categoryMotionItem}>
          <Button
            onClick={(event) =>
              filterThreadsHandler({ event, targetCategory: category })
            }
            className={`rounded-lg border px-2 py-1 text-sm italic ${category === categoryState ? 'border-primary bg-primary text-white' : 'text-slate-500'}`}
          >
            #{category}
          </Button>
        </motion.div>
      ))}
    </motion.div>
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

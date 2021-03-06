import { useState } from 'react';
import { useQuery } from '@apollo/client';

import { GET_SEARCHED_ANIME } from './queries/queries';
import { formatDescription } from './utils/strings';

import Loading from './components/Loading';

const App = (): JSX.Element => {
  const [textInput, setInput] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(1);
  const { loading, error, data } = useQuery(GET_SEARCHED_ANIME, {
    variables: {
      input: textInput,
      page: page
    },
    onCompleted: (data) => {
      setTotalPage(data.Page.pageInfo.lastPage);
    }
  });

  return (
    <div className="w-2/3 m-auto p-20 pt-16 flex flex-col items-center">
      <div className="w-full mb-8">
        <h1 className="font-semibold text-3xl text-green-400 hover:text-green-300 transition-all">Anime.</h1>
      </div>
      <div className="flex w-full mb-6">
        <input value={textInput} onChange={(e) => setInput(e.target.value)} className="border-2 rounded px-4 py-2 w-full focus:outline-none focus:border-green-500" type="text" placeholder="Enter a title here..." />
      </div>
      {
        loading ?
          <>
            <div className="">
              <Loading />
            </div>
            <div className="w-full">
            {[...Array(5)].map((value, index) => (
                <div className="my-4 rounded-lg shadow-md border flex cursor-pointer animate-pulse" key={index}>
                  <div className="h-80 w-1/5 bg-gray-100">
                    <div className="object-cover h-full w-full rounded-l-lg"></div>
                  </div>
                  <div className="p-4 w-4/5">
                    <div className="w-5/12 bg-gray-100 rounded-md h-8 mb-8"></div>
                    <div className="w-full bg-gray-100 rounded-md h-8 mb-2"></div>
                    <div className="w-full bg-gray-100 rounded-md h-8 mb-2"></div>
                    <div className="w-8/12 bg-gray-100 rounded-md h-8"></div>
                  </div>
                </div>
              ))
            }
            </div>
          </>
        :
          <>
            {error ?
              <p>error</p>
            :
              <>
                <nav className="h-10 relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                    <span className="sr-only">Previous</span>
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
                    </svg>
                  </button>
                  {[...Array(totalPage)].map((value, i) => {
                    if(i + 1 === page) {
                      return (
                        <button onClick={() => setPage(i + 1)} aria-current="page" className="z-10 bg-indigo-50 border-green-500 text-green-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                          {i + 1}
                        </button>
                      );
                    } else {
                      return (
                        <button onClick={() => setPage(i + 1)} aria-current="page" className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                          {i + 1}
                        </button>
                      );
                    }
                  })}
                  <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                    <span className="sr-only">Next</span>
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                    </svg>
                  </button>
                </nav>
                <div className="w-full">
                {data.Page.media.map(({ id, title, description, averageScore, coverImage }: { id: number, title: { romaji: string }, description: string, averageScore: number, coverImage: { large: string }}) => (
                    <div className="my-4 rounded-lg shadow-md border flex cursor-pointer hover:border-gray-400" key={id}>
                      <div className="h-80 w-1/5 bg-red-300 rounded-lg">
                        <img className="object-cover h-full w-full rounded-l-lg" src={coverImage.large} alt="cover" />
                      </div>
                      <div className="py-6 px-8 w-4/5">
                        <div className="flex items-center justify-between mb-8">
                          <h1 className="text-lg font-medium cursor-text">{title.romaji}</h1>
                          <p><span className="font-medium cursor-text">Score:</span> {averageScore}</p>
                        </div>
                        <p className="cursor-text text-gray-500">{formatDescription(description)}</p>
                      </div>
                    </div>
                  ))
                }
                </div>
              </>
            }
          </>
      }
    </div>
  );
};

export default App;

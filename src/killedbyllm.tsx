import React, { useState } from 'react';
import { Search, ExternalLink, Info } from 'lucide-react';
import { Benchmark, benchmarkData } from './data';

const getTimeSince = (date: Date) => {
  const now = new Date();
  const diffMonths = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24 * 30));
  
  if (diffMonths < 1) return 'this month';
  if (diffMonths === 1) return '1 month ago';
  if (diffMonths < 12) return `${diffMonths} months ago`;
  
  const years = Math.floor(diffMonths / 12);
  if (years === 1) return '1 year ago';
  return `${years} years ago`;
};

const getLifespan = (created: Date, defeated: Date) => {
  const diffMonths = Math.floor((defeated.getTime() - created.getTime()) / (1000 * 60 * 60 * 24 * 30));
  const years = Math.floor(diffMonths / 12);
  const months = diffMonths % 12;
  
  if (years === 0) {
    return months === 1 ? '1 month old' : `${months} months old`;
  }
  if (years === 1) {
    return months === 0 ? '1 year old' : `1 year and ${months} months old`;
  }
  return months === 0 ? `${years} years old` : `${years} years and ${months} months old`;
};

const BenchmarkCard = ({ benchmark }: { benchmark: Benchmark }) => {
  const created = new Date(benchmark.dateCreated);
  const defeated = new Date(benchmark.dateDefeated);
  
  const killedTime = getTimeSince(defeated);
  const lifespan = getLifespan(created, defeated);
  const formattedDescription = `Killed ${killedTime}, ${benchmark.description} It was ${lifespan}.`;

  const cardClasses = benchmark.isLegendary
    ? "group relative h-full flex flex-col benchmark-card transform hover:scale-[1.02] transition-all duration-300"
    : "group relative h-full flex flex-col benchmark-card";

  const gradientClasses = benchmark.isLegendary
    ? "absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-amber-900/30 via-gray-900/20 to-gray-900/30 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-[10]"
    : "absolute inset-0 bg-gradient-to-r from-gray-900/50 via-red-900/20 to-gray-900/50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500";

  const borderClasses = benchmark.isLegendary
    ? "relative flex-1 flex flex-col bg-gray-950 rounded-lg p-4 border-2 border-gray-800/50 backdrop-blur-xl transition-all duration-500 bg-[linear-gradient(45deg,transparent_25%,rgba(68,64,60,0.2)_50%,transparent_75%,transparent_100%)] bg-[length:4px_4px] bg-[position:0_0] animate-[grain_8s_steps(10)_infinite]"
    : "relative flex-1 flex flex-col bg-gray-950 rounded-lg p-4 border border-gray-800/50 backdrop-blur-xl transition-all duration-500 group-hover:border-gray-700/50";

  {benchmark.isLegendary && (
    <div 
      className="absolute inset-0 rounded-lg border-2 border-transparent"
      style={{
        background: 'linear-gradient(45deg, #92400e, #78350f, #92400e, #78350f) border-box',
        WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
        WebkitMaskComposite: 'xor',
        maskComposite: 'exclude',
      }}
    />
  )}

  const nameClasses = benchmark.isLegendary
    ? "text-xl font-medium tracking-tight text-amber-100 benchmark-name mb-1 drop-shadow-sm"
    : "text-lg font-medium tracking-tight text-white benchmark-name mb-1";

  return (
    <div className={cardClasses}>
      <div className={gradientClasses} />
      
      <div className={borderClasses}>
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-3">
          {/* Left side */}
          <div className="flex-1">
            <h3 className={nameClasses}>
              {benchmark.name}
              <span className="text-gray-400 bg-gray-950 text-xs pl-1">({created.getFullYear()} - {defeated.getFullYear()})</span>
            </h3>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 text-[10px] font-medium text-gray-400 bg-gray-900 rounded tracking-wide benchmark-category">
                {benchmark.category}
              </span>
            </div>
          </div>
          
          {/* Right side */}
          <div className="flex flex-col items-end">
            <span className={`text-[10px] uppercase tracking-wider ${benchmark.isLegendary ? 'text-amber-500' : 'text-gray-500'}`}>
              Killed by
            </span>
            <div className="flex items-center gap-1">
              <span className={`text-sm font-medium ${benchmark.isLegendary ? 'text-amber-400' : 'text-red-400'}`}>
                {benchmark.cause}
              </span>
              {benchmark.causeDetails && (
                <div className="group/tooltip relative">
                  <Info size={12} className="text-gray-500 cursor-help" />
                  <div className="absolute bottom-full right-0 mb-2 w-64 p-2 bg-gray-900 rounded-lg border border-gray-700 
                                text-xs text-gray-300 opacity-0 invisible group-hover/tooltip:opacity-100 
                                group-hover/tooltip:visible transition-all duration-200 z-20">
                    {benchmark.causeDetails}
                  </div>
                </div>
              )}
            </div>
            {benchmark.links?.paper && (
              <a href={benchmark.links.paper} 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-gray-500 hover:text-white transition-colors mt-1">
                <ExternalLink size={14} />
              </a>
            )}
          </div>
        </div>

        {/* Description */}
        <div className="flex-1 mb-2">
          <p className={`text-sm leading-relaxed mb-3 line-clamp-8 group-hover:line-clamp-none benchmark-description ${
            benchmark.isLegendary ? 'text-amber-100/90' : 'text-gray-300'
          }`}>
            {formattedDescription}
          </p>
        </div>


        {/* Scores */}
        <div className={`flex-none mt-auto border-t pt-3 ${benchmark.isLegendary ? 'border-amber-800/50' : 'border-gray-800/50'}`}>
          <div className="text-xs text-gray-400 mb-2">
            <span className="text-gray-300">Defeated by:</span> {benchmark.modelDefeated}
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="rounded bg-gray-900 px-2 py-1.5">
              <div className="text-[10px] text-gray-500">Original Score</div>
              <div className="text-xs text-gray-200">{benchmark.originalScore}</div>
            </div>
            <div className="rounded bg-gray-900 px-2 py-1.5">
              <div className="text-[10px] text-gray-500">Final Score</div>
              <div className="flex items-center gap-1">
                <span className="text-xs text-red-400">{benchmark.finalScore}</span>
                {benchmark.links?.evidence && (
                  <a 
                    href={benchmark.links.evidence}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-white transition-colors"
                  >
                    <ExternalLink size={10} />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface YearSectionProps {
  year: string;
  benchmarks: Benchmark[];
}

const YearSection = ({ year, benchmarks }: YearSectionProps) => (
  <div className="col-span-full" data-year={year}>
    <div className="flex items-center gap-4 my-8">
      <h2 className="text-2xl font-medium text-gray-300">{year}</h2>
      <div className="h-px flex-1 bg-gradient-to-r from-gray-800 to-transparent" />
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {benchmarks.map((benchmark, index) => (
        <BenchmarkCard key={index} benchmark={benchmark} />
      ))}
    </div>
  </div>
);

const KilledByLLM = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [timeRange, setTimeRange] = useState('all');
  
  const categories = ['All', ...new Set(benchmarkData.map(b => b.category))];
  
  const filteredBenchmarks = benchmarkData
    .filter(benchmark => {
      const matchesSearch = 
        benchmark.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        benchmark.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        benchmark.creators.toLowerCase().includes(searchTerm.toLowerCase()) ||
        benchmark.organization.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || benchmark.category === selectedCategory;
      const defeatedYear = new Date(benchmark.dateDefeated).getFullYear();
      const matchesTimeRange = timeRange === 'all' || 
        (timeRange === 'pre-2023' && defeatedYear < 2023) ||
        (timeRange === defeatedYear.toString());
      
      return matchesSearch && matchesCategory && matchesTimeRange;
    })
    .sort((a, b) => new Date(b.dateDefeated).getTime() - new Date(a.dateDefeated).getTime());

  // Group benchmarks by year
  const groupedBenchmarks = filteredBenchmarks.reduce<Record<string, Benchmark[]>>((acc, benchmark) => {
    const year = new Date(benchmark.dateDefeated).getFullYear().toString();
    if (!acc[year]) acc[year] = [];
    acc[year].push(benchmark);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-950 to-black text-gray-100">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900 via-gray-950 to-black" />
      
      {/* GitHub Link */}
      <div className="absolute top-4 right-4 z-10">
        <a
          href="https://github.com/R0bk/killedbyllm"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
        >
          <span className="text-sm">@R0bk/killedbyllm</span>
          <ExternalLink size={14} />
        </a>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-6 py-12">
        <header className="text-center mb-16">
          <h1 className="text-5xl font-medium tracking-tight mb-4 bg-gradient-to-r from-white via-gray-100 to-gray-300 text-transparent bg-clip-text">
            Killed by LLM
          </h1>
          <p className="text-lg text-gray-400 tracking-wide">
            A memorial to the benchmarks that defined—and were defeated by—AI progress
          </p>
        </header>

        <div className="sticky top-0 z-20 bg-black/10 backdrop-blur-sm py-2 mb-8 px-2 rounded-2xl">
          <div className="flex flex-wrap gap-4 items-center">
            {/* Existing search input */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-3.5 text-gray-500 pointer-events-none" size={18} />
              <input
                type="text"
                name="search"
                placeholder="Search benchmarks, creators, or organizations..."
                className="w-full pl-11 pr-4 py-3 bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 rounded-xl 
                           focus:outline-none focus:border-gray-700 focus:ring-1 focus:ring-gray-700 
                           text-gray-200 placeholder-gray-500 transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            {/* Category filter */}
            <select
              name="category"
              className="px-4 py-3 bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 rounded-xl
                         focus:outline-none focus:border-gray-700 focus:ring-1 focus:ring-gray-700
                         text-gray-200 appearance-none cursor-pointer min-w-[160px] transition-all"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>

            {/* Time range filter */}
            <select 
              name="timeRange"
              className="px-4 py-3 bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 rounded-xl
                         focus:outline-none focus:border-gray-700 focus:ring-1 focus:ring-gray-700
                         text-gray-200 appearance-none cursor-pointer min-w-[140px] transition-all"
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
            >
              <option value="all">All Time</option>
              <option value="2024">2024</option>
              <option value="2023">2023</option>
              <option value="pre-2023">Pre-2023</option>
            </select>
          </div>
        </div>

        {/* Render grouped benchmarks */}
        <div className="relative">
          {Object.entries(groupedBenchmarks)
            .sort(([yearA], [yearB]) => Number(yearB) - Number(yearA))
            .map(([year, benchmarks]) => (
              <div key={year} className="relative">
                <YearSection year={year} benchmarks={benchmarks} />
                <div className="absolute -left-16 top-20 bottom-0 w-px bg-gradient-to-b from-gray-900 via-gray-700 to-transparent" />
              </div>
            ))}
        </div>

        {/* Information Section */}
        <div className="mt-20 border-t border-gray-800/50 pt-16 text-center	">

          {/* Inspiration Section */}
          <div className="max-w-3xl mb-16 justify-self-center	">
            <h2 className="text-2xl font-medium mb-4 bg-gradient-to-r from-white via-gray-100 to-gray-300 text-transparent bg-clip-text">
              Inspiration
            </h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              This website is meant to be a bit of fun, and to help us take a look back and remember the massive amount of progress 
              that has been made — much of which I didn't believe I'd see within my lifetime.
            </p>
            <p className="text-gray-300 leading-relaxed">
              It has also been heavily inspired by Cody Ogden's{' '}
              <a 
                href="https://killedbygoogle.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-400/80 hover:text-amber-300 transition-colors"
              >
                Killed by Google
              </a>
            </p>
          </div>


          {/* Understanding Saturation */}
          <div className="max-w-3xl mb-16 justify-self-center pt-8 border-t border-gray-800/50">
            <h2 className="text-2xl font-medium mb-4 bg-gradient-to-r from-white via-gray-100 to-gray-300 text-transparent bg-clip-text">
              Understanding "Saturation"
            </h2>
            <p className="text-gray-300 leading-relaxed">
              For KilledByLLM <i>"Saturation"</i> means a benchmark can no longer measure the frontier.
              While these benchmarks are still incredibly useful, valuable tools — they are no longer able to meaningfully contribute to the question of <i>"Can AI do X?"</i>
            </p>
          </div>

          {/* Data Collection Challenges */}
          <div className="max-w-3xl mb-16 justify-self-center pt-8 border-t border-gray-800/50">
            <h2 className="text-2xl font-medium mb-4 bg-gradient-to-r from-white via-gray-100 to-gray-300 text-transparent bg-clip-text">
              Data Collection Challenges
            </h2>
            <div className="text-gray-300 leading-relaxed space-y-4">
              <p>
                This project represents a best-effort attempt to document benchmarks-of-note that have been envloped by LLMs.
                Proper attribution, timing and scores have been difficult to determine definitively, hence there may be some errors.
              </p>
              <div className="max-w-xl mx-auto text-left">
                <p>
                  <span className="text-center">To illustrate this, let's examine "Qwen-2.5-72B-instruct" on MATH:</span>
                  <ul className="mt-2 space-y-1 pl-4">
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-1 rounded-full bg-gray-700 flex-shrink-0" />
                      <span>From Qwen's technical report - 83.1</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-1 rounded-full bg-gray-700 flex-shrink-0" />
                      <span>From Stanford's HELM - 79.0</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-1 rounded-full bg-gray-700 flex-shrink-0" />
                      <span>From Huggingface's Open LLM Leaderboard - 38.7</span>
                    </li>
                  </ul>
                  <p className="mt-2 text-center">
                    These scores significantly deviatiate from eachother!
                  </p>
                </p>
                
                <p className="mt-8 text-center">
                  Hence we take scores in the following approach:
                </p>
                <p className="text-xs text-gray-400 text-center">
                  Please raise an issue or PR if you identify any discrepancies!
                </p>
                <ol className="list-decimal pl-6 mt-4">
                  <li>
                    <p>
                      From the author's paper/ technical report/ model card
                    </p>
                  </li>
                  <li>
                    <p>
                      From succeeding benckmark papers <span className="text-xs text-gray-400">e.g. SQuAD 2.0 discusses SQuAD 1.1 performance</span>
                    </p>
                  </li>
                  <li>
                    <p>
                      From third party sources <span className="text-xs text-gray-400">e.g. Stanford's HELM</span>
                    </p>
                  </li>
                </ol>
              </div>
            </div>
            
            <p className="text-gray-400 text-sm pt-8">
              Found an error or have additional data? {' '}
              <a
                href="https://github.com/R0bk/killedbyllm"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-amber-300 hover:text-white transition-colors ml-1"
              >
                <span>Contribute on GitHub</span>
                <ExternalLink size={14} />
              </a>
            </p>

          </div>

        </div>
      </div>
      <p className='text-[8px] text-gray-500 text-center pb-2'>P.S. The em dashes on this page were lovingly handwritten by humans.</p>
    </div>
  );
};

export { KilledByLLM };

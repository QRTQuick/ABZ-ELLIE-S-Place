import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Home, Search, ArrowLeft, Trophy, RotateCcw } from 'lucide-react';
import { Link } from './Router';
import SEOHead from './SEOHead';

interface Gem {
  id: number;
  x: number;
  y: number;
  type: 'diamond' | 'ruby' | 'emerald' | 'sapphire';
  collected: boolean;
}

interface Player {
  x: number;
  y: number;
}

const GemCollectorGame: React.FC = () => {
  const [player, setPlayer] = useState<Player>({ x: 50, y: 50 });
  const [gems, setGems] = useState<Gem[]>([]);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameOver, setGameOver] = useState(false);
  const [highScore, setHighScore] = useState(() => {
    const saved = localStorage.getItem('abz_gem_highscore');
    return saved ? parseInt(saved) : 0;
  });

  const gemTypes = ['diamond', 'ruby', 'emerald', 'sapphire'] as const;
  const gemColors = {
    diamond: '#e5e7eb',
    ruby: '#ef4444',
    emerald: '#10b981',
    sapphire: '#3b82f6'
  };

  const generateGems = useCallback(() => {
    const newGems: Gem[] = [];
    for (let i = 0; i < 15; i++) {
      newGems.push({
        id: i,
        x: Math.random() * 90 + 5,
        y: Math.random() * 80 + 10,
        type: gemTypes[Math.floor(Math.random() * gemTypes.length)],
        collected: false
      });
    }
    setGems(newGems);
  }, []);

  const startGame = () => {
    setGameStarted(true);
    setGameOver(false);
    setScore(0);
    setTimeLeft(30);
    setPlayer({ x: 50, y: 50 });
    generateGems();
  };

  const resetGame = () => {
    setGameStarted(false);
    setGameOver(false);
    setScore(0);
    setTimeLeft(30);
    setPlayer({ x: 50, y: 50 });
    setGems([]);
  };

  useEffect(() => {
    if (!gameStarted || gameOver) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setGameOver(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameStarted, gameOver]);

  useEffect(() => {
    if (!gameStarted) return;

    const handleKeyPress = (e: KeyboardEvent) => {
      const speed = 5;
      setPlayer(prev => {
        let newX = prev.x;
        let newY = prev.y;

        switch (e.key) {
          case 'ArrowUp':
          case 'w':
          case 'W':
            newY = Math.max(0, prev.y - speed);
            break;
          case 'ArrowDown':
          case 's':
          case 'S':
            newY = Math.min(90, prev.y + speed);
            break;
          case 'ArrowLeft':
          case 'a':
          case 'A':
            newX = Math.max(0, prev.x - speed);
            break;
          case 'ArrowRight':
          case 'd':
          case 'D':
            newX = Math.min(95, prev.x + speed);
            break;
        }

        return { x: newX, y: newY };
      });
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameStarted]);

  const movePlayer = (direction: 'up' | 'down' | 'left' | 'right') => {
    const speed = 8;
    setPlayer(prev => {
      let newX = prev.x;
      let newY = prev.y;

      switch (direction) {
        case 'up':
          newY = Math.max(0, prev.y - speed);
          break;
        case 'down':
          newY = Math.min(90, prev.y + speed);
          break;
        case 'left':
          newX = Math.max(0, prev.x - speed);
          break;
        case 'right':
          newX = Math.min(95, prev.x + speed);
          break;
      }

      return { x: newX, y: newY };
    });
  };

  useEffect(() => {
    if (!gameStarted) return;

    // Check for gem collection
    setGems(prevGems => {
      return prevGems.map(gem => {
        if (gem.collected) return gem;

        const distance = Math.sqrt(
          Math.pow(player.x - gem.x, 2) + Math.pow(player.y - gem.y, 2)
        );

        if (distance < 8) {
          setScore(prev => prev + 10);
          // Create a simple "ding" sound effect using Web Audio API
          try {
            const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(1200, audioContext.currentTime + 0.1);
            
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.1);
          } catch (e) {
            // Fallback for browsers that don't support Web Audio API
            console.log('Gem collected!');
          }
          
          return { ...gem, collected: true };
        }

        return gem;
      });
    });
  }, [player, gameStarted]);

  const uncollectedGems = gems.filter(gem => !gem.collected);
  const allGemsCollected = gems.length > 0 && uncollectedGems.length === 0;

  useEffect(() => {
    if (allGemsCollected && gameStarted) {
      const bonusScore = score + 50; // Bonus for collecting all gems
      setScore(bonusScore);
      if (bonusScore > highScore) {
        setHighScore(bonusScore);
        localStorage.setItem('abz_gem_highscore', bonusScore.toString());
      }
      setGameOver(true);
    }
  }, [allGemsCollected, gameStarted, score, highScore]);

  useEffect(() => {
    if (gameOver && !allGemsCollected && score > highScore) {
      setHighScore(score);
      localStorage.setItem('abz_gem_highscore', score.toString());
    }
  }, [gameOver, allGemsCollected, score, highScore]);

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-slate-900 rounded-3xl p-8 text-white">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-serif font-bold mb-2">💎 Gem Collector</h3>
          <p className="text-slate-300 text-sm mb-2">
            Collect all the gems while you wait! Use arrow keys or WASD to move.
          </p>
          <div className="flex justify-center items-center space-x-4 text-xs text-slate-400">
            <span>💎 Diamond: 10pts</span>
            <span>❤️ Ruby: 10pts</span>
            <span>💚 Emerald: 10pts</span>
            <span>💙 Sapphire: 10pts</span>
          </div>
        </div>

        {!gameStarted ? (
          <div className="text-center space-y-4">
            <div className="text-6xl mb-4">💎</div>
            <p className="text-slate-300 mb-6">
              Help our gem collector find all the precious stones scattered around!
            </p>
            <motion.button
              onClick={startGame}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-gradient-to-r from-blue-500 via-red-500 to-yellow-500 rounded-2xl font-bold text-white shadow-lg"
            >
              Start Game
            </motion.button>
          </div>
        ) : (
          <>
            {/* Game Stats */}
            <div className="flex justify-between items-center mb-4 text-sm">
              <div className="flex items-center space-x-4">
                <span>Score: <strong className="text-yellow-400">{score}</strong></span>
                <span>Gems: <strong className="text-blue-400">{uncollectedGems.length}</strong></span>
                <span className="text-xs">
                  <Trophy size={12} className="inline mr-1" />
                  Best: <strong>{highScore}</strong>
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <span>Time: <strong className={timeLeft <= 10 ? 'text-red-400' : ''}>{timeLeft}s</strong></span>
                <motion.button
                  onClick={resetGame}
                  whileHover={{ scale: 1.1 }}
                  className="p-1 hover:bg-slate-700 rounded"
                >
                  <RotateCcw size={16} />
                </motion.button>
              </div>
            </div>

            {/* Game Area */}
            <div className="relative bg-slate-800 rounded-2xl h-80 overflow-hidden border-2 border-slate-700">
              {/* Background pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-4 left-4 w-2 h-2 bg-white rounded-full animate-pulse"></div>
                <div className="absolute top-12 right-8 w-1 h-1 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                <div className="absolute bottom-8 left-12 w-1 h-1 bg-white rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                <div className="absolute bottom-4 right-4 w-2 h-2 bg-white rounded-full animate-pulse" style={{ animationDelay: '1.5s' }}></div>
              </div>

              {/* Player */}
              <motion.div
                className="absolute w-6 h-6 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full shadow-lg z-10"
                style={{
                  left: `${player.x}%`,
                  top: `${player.y}%`,
                  transform: 'translate(-50%, -50%)'
                }}
                animate={{
                  boxShadow: [
                    '0 0 10px rgba(59, 130, 246, 0.5)',
                    '0 0 20px rgba(147, 51, 234, 0.8)',
                    '0 0 10px rgba(59, 130, 246, 0.5)'
                  ]
                }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <div className="absolute inset-0 bg-white rounded-full opacity-30"></div>
                <div className="absolute inset-1 bg-gradient-to-r from-blue-300 to-purple-300 rounded-full opacity-50"></div>
              </motion.div>

              {/* Gems */}
              {gems.map(gem => (
                !gem.collected && (
                  <motion.div
                    key={gem.id}
                    className="absolute w-4 h-4 rounded-full shadow-md"
                    style={{
                      left: `${gem.x}%`,
                      top: `${gem.y}%`,
                      backgroundColor: gemColors[gem.type],
                      transform: 'translate(-50%, -50%)'
                    }}
                    animate={{
                      scale: [1, 1.2, 1],
                      rotate: [0, 180, 360]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <div className="absolute inset-0 bg-white rounded-full opacity-40"></div>
                    <motion.div
                      className="absolute -inset-1 rounded-full"
                      animate={{
                        boxShadow: [
                          `0 0 5px ${gemColors[gem.type]}40`,
                          `0 0 15px ${gemColors[gem.type]}80`,
                          `0 0 5px ${gemColors[gem.type]}40`
                        ]
                      }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                  </motion.div>
                )
              ))}

              {/* Collected gems animation */}
              {gems.filter(gem => gem.collected).map(gem => (
                <motion.div
                  key={`collected-${gem.id}`}
                  className="absolute w-4 h-4 pointer-events-none"
                  style={{
                    left: `${gem.x}%`,
                    top: `${gem.y}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                  initial={{ scale: 1, opacity: 1 }}
                  animate={{ 
                    scale: [1, 2, 0],
                    opacity: [1, 1, 0],
                    y: [-20, -40, -60]
                  }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="text-yellow-400 font-bold text-xs">+10</div>
                </motion.div>
              ))}

              {/* Game Over Overlay */}
              {gameOver && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 bg-black/80 flex items-center justify-center"
                >
                  <div className="text-center space-y-4">
                    <motion.div 
                      className="text-4xl"
                      animate={{ 
                        scale: [1, 1.2, 1],
                        rotate: [0, 10, -10, 0]
                      }}
                      transition={{ duration: 0.5, repeat: 3 }}
                    >
                      {allGemsCollected ? '🏆' : '⏰'}
                    </motion.div>
                    <h4 className="text-xl font-bold">
                      {allGemsCollected ? 'Perfect Collection!' : 'Time\'s Up!'}
                    </h4>
                    <p className="text-slate-300">
                      Final Score: <strong className="text-yellow-400">{score}</strong>
                      {score > highScore && (
                        <span className="block text-green-400 text-sm mt-1">🎉 New High Score!</span>
                      )}
                    </p>
                    {allGemsCollected && (
                      <p className="text-green-400 text-sm">
                        💎 Perfect Collection Bonus: +50 points!
                      </p>
                    )}
                    <motion.button
                      onClick={startGame}
                      whileHover={{ scale: 1.05 }}
                      className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl font-bold"
                    >
                      Play Again
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Controls */}
            <div className="mt-4 space-y-3">
              <div className="text-center text-xs text-slate-400">
                Use <kbd className="px-2 py-1 bg-slate-700 rounded">↑↓←→</kbd> or <kbd className="px-2 py-1 bg-slate-700 rounded">WASD</kbd> to move
              </div>
              
              {/* Mobile Touch Controls */}
              <div className="flex justify-center md:hidden">
                <div className="grid grid-cols-3 gap-2 w-32">
                  <div></div>
                  <motion.button
                    onTouchStart={() => movePlayer('up')}
                    whileTap={{ scale: 0.9 }}
                    className="w-10 h-10 bg-slate-700 rounded-lg flex items-center justify-center text-white font-bold"
                  >
                    ↑
                  </motion.button>
                  <div></div>
                  
                  <motion.button
                    onTouchStart={() => movePlayer('left')}
                    whileTap={{ scale: 0.9 }}
                    className="w-10 h-10 bg-slate-700 rounded-lg flex items-center justify-center text-white font-bold"
                  >
                    ←
                  </motion.button>
                  <div></div>
                  <motion.button
                    onTouchStart={() => movePlayer('right')}
                    whileTap={{ scale: 0.9 }}
                    className="w-10 h-10 bg-slate-700 rounded-lg flex items-center justify-center text-white font-bold"
                  >
                    →
                  </motion.button>
                  
                  <div></div>
                  <motion.button
                    onTouchStart={() => movePlayer('down')}
                    whileTap={{ scale: 0.9 }}
                    className="w-10 h-10 bg-slate-700 rounded-lg flex items-center justify-center text-white font-bold"
                  >
                    ↓
                  </motion.button>
                  <div></div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-white pt-24 flex items-center justify-center">
      <SEOHead 
        title="Page Not Found | ABZ&ELLIE'S Place"
        description="The page you're looking for doesn't exist. Return to ABZ&ELLIE'S Place homepage to continue shopping for premium perfumes, jewelry, and beauty products."
        url="https://abz-ellie-s-place.vercel.app/404"
      />
      
      <div className="max-w-2xl mx-auto px-4 md:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          {/* 404 Animation */}
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="relative"
          >
            <div className="text-9xl md:text-[12rem] font-serif font-bold text-slate-100 select-none">
              404
            </div>
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            >
              <Search size={80} className="text-slate-300" />
            </motion.div>
          </motion.div>

          {/* Content */}
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900">
              Oops! Page Not Found
            </h1>
            <p className="text-xl text-slate-600 max-w-lg mx-auto leading-relaxed">
              The page you're looking for seems to have wandered off. 
              Don't worry, our beautiful products are still here waiting for you!
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 animated-gradient-bg text-white rounded-2xl font-bold flex items-center space-x-2 shadow-lg hover:shadow-xl transition-all"
              >
                <Home size={20} />
                <span>Back to Home</span>
              </motion.button>
            </Link>
            
            <Link to="/shop">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 border-2 border-slate-300 text-slate-700 rounded-2xl font-bold flex items-center space-x-2 hover:border-slate-400 transition-all"
              >
                <Search size={20} />
                <span>Browse Products</span>
              </motion.button>
            </Link>
          </div>

          {/* Gem Collector Game */}
          <div className="mt-12">
            <GemCollectorGame />
          </div>

          {/* Popular Links */}
          <div className="pt-8 border-t border-slate-100">
            <p className="text-sm text-slate-500 mb-4 uppercase tracking-wider font-bold">
              Popular Pages
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/current-stock" className="text-blue-600 hover:text-blue-800 font-medium transition-colors">
                Current Stock
              </Link>
              <Link to="/about" className="text-blue-600 hover:text-blue-800 font-medium transition-colors">
                About Us
              </Link>
              <Link to="/contact" className="text-blue-600 hover:text-blue-800 font-medium transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
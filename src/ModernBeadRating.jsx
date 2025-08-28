import React, { useState, useEffect } from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Button, 
  Chip, 
  Avatar, 
  Box,
  Grid,
  Paper,
  Fade,
  Slide,
  Grow
} from '@mui/material';
import { 
  Star, 
  Favorite, 
  Psychology, 
  AutoAwesome,
  TrendingUp,
  HealthAndSafety
} from '@mui/icons-material';

const ModernBeadRating = () => {
  const [scores, setScores] = useState({
    love: 8,
    windfall: 6,
    regularIncome: 7,
    career: 9,
    health: 8
  });

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const startAnalysis = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowResult(true);
    }, 2000);
  };

  const getScoreColor = (score) => {
    if (score >= 8) return 'success';
    if (score >= 6) return 'warning';
    return 'error';
  };

  const getScoreIcon = (score) => {
    if (score >= 8) return <Star sx={{ color: 'gold' }} />;
    if (score >= 6) return <TrendingUp sx={{ color: 'orange' }} />;
    return <TrendingUp sx={{ color: 'red' }} />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-6">
      {/* 標題區域 */}
      <Fade in timeout={1000}>
        <Box className="text-center mb-12">
          <Typography 
            variant="h2" 
            className="text-white font-bold mb-4"
            sx={{ 
              background: 'linear-gradient(45deg, #FFD700, #FF6B6B)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            ✨ 神秘串珠評分 ✨
          </Typography>
          <Typography variant="h6" className="text-gray-300">
            讓星象大師為您解讀串珠設計的奧秘
          </Typography>
        </Box>
      </Fade>

      <Grid container spacing={4} className="max-w-7xl mx-auto">
        {/* 左側：通靈師對話區 */}
        <Grid item xs={12} md={6}>
          <Slide direction="right" in timeout={800}>
            <Card className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl">
              <CardContent className="p-8">
                <Box className="flex items-center mb-6">
                  <Avatar 
                    src="/psychic-medium.jpeg" 
                    className="w-16 h-16 mr-4 border-4 border-purple-300/50"
                  />
                  <Box>
                    <Typography variant="h5" className="text-purple-200 font-bold">
                      星象大師: 小乖
                    </Typography>
                    <Typography variant="body2" className="text-purple-300">
                      ✨ 能量分析專家 ✨
                    </Typography>
                  </Box>
                </Box>

                {!isAnalyzing && !showResult && (
                  <Fade in timeout={500}>
                    <Box className="text-center">
                      <Psychology className="text-6xl text-purple-400 mb-4 animate-bounce-gentle" />
                      <Typography variant="h6" className="text-white mb-4">
                        歡迎來到神秘占卜殿堂
                      </Typography>
                      <Typography variant="body1" className="text-gray-300 mb-6">
                        讓我來解讀你的串珠設計...
                      </Typography>
                      <Button 
                        variant="contained" 
                        size="large"
                        onClick={startAnalysis}
                        className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                        startIcon={<AutoAwesome />}
                      >
                        開始神秘分析
                      </Button>
                    </Box>
                  </Fade>
                )}

                {isAnalyzing && (
                  <Grow in timeout={300}>
                    <Box className="text-center">
                      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-400 mx-auto mb-4"></div>
                      <Typography variant="h6" className="text-purple-200 mb-2">
                        正在解讀你的串珠作品...
                      </Typography>
                      <Typography variant="body2" className="text-purple-300">
                        水晶球正在揭示命運的奧秘...
                      </Typography>
                    </Box>
                  </Grow>
                )}

                {showResult && (
                  <Fade in timeout={800}>
                    <Box>
                      <Typography variant="h6" className="text-purple-200 mb-4">
                        神秘解析結果
                      </Typography>
                      <Paper className="bg-white/5 p-4 border border-purple-300/30">
                        <Typography variant="body1" className="text-gray-200 leading-relaxed">
                          你的串珠作品展現了獨特的藝術天賦和內在智慧。淺藍色的水晶珠代表著你內在的寧靜與智慧，
                          這種清澈的顏色象徵著你思維的清晰和溝通的優雅。你的設計豐富多彩，
                          這體現了你對生活的熱愛和對美的追求，這種積極的態度將為你帶來好運。
                        </Typography>
                      </Paper>
                    </Box>
                  </Fade>
                )}
              </CardContent>
            </Card>
          </Slide>
        </Grid>

        {/* 右側：評分雷達圖 */}
        <Grid item xs={12} md={6}>
          <Slide direction="left" in timeout={800}>
            <Card className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl">
              <CardContent className="p-8">
                <Typography variant="h5" className="text-center text-white mb-6">
                  🎯 能量評分雷達圖
                </Typography>
                
                <Box className="space-y-4">
                  {Object.entries(scores).map(([key, value]) => (
                    <Grow in timeout={200 * Object.keys(scores).indexOf(key)}>
                      <Paper key={key} className="bg-white/5 p-4 border border-white/20">
                        <Box className="flex items-center justify-between">
                          <Box className="flex items-center">
                            {key === 'love' && <Favorite className="text-red-400 mr-2" />}
                            {key === 'windfall' && <TrendingUp className="text-green-400 mr-2" />}
                            {key === 'regularIncome' && <TrendingUp className="text-blue-400 mr-2" />}
                            {key === 'career' && <AutoAwesome className="text-yellow-400 mr-2" />}
                            {key === 'health' && <HealthAndSafety className="text-emerald-400 mr-2" />}
                            
                            <Typography variant="body1" className="text-white capitalize">
                              {key === 'love' ? '愛情運勢' : 
                               key === 'windfall' ? '偏財運勢' :
                               key === 'regularIncome' ? '正財運勢' :
                               key === 'career' ? '事業運勢' : '健康運勢'}
                            </Typography>
                          </Box>
                          
                          <Box className="flex items-center">
                            {getScoreIcon(value)}
                            <Chip 
                              label={value} 
                              color={getScoreColor(value)}
                              className="ml-2"
                              size="small"
                            />
                          </Box>
                        </Box>
                        
                        {/* 進度條 */}
                        <Box className="mt-2">
                          <div className="w-full bg-gray-700 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full transition-all duration-1000 ${
                                value >= 8 ? 'bg-green-500' : 
                                value >= 6 ? 'bg-yellow-500' : 'bg-red-500'
                              }`}
                              style={{ width: `${value * 10}%` }}
                            ></div>
                          </div>
                        </Box>
                      </Paper>
                    </Grow>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Slide>
        </Grid>
      </Grid>
    </div>
  );
};

export default ModernBeadRating;

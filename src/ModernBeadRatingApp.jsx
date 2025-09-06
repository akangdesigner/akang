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
  Grow,
  LinearProgress,
  IconButton,
  Tooltip
} from '@mui/material';
import { 
  Star, 
  Favorite, 
  Psychology, 
  AutoAwesome,
  TrendingUp,
  HealthAndSafety,
  Home,
  ArrowBack,
  Refresh,
  Visibility
} from '@mui/icons-material';

const ModernBeadRatingApp = () => {
  const [scores, setScores] = useState({
    love: 8,
    windfall: 6,
    regularIncome: 7,
    career: 9,
    health: 8
  });

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [currentMessage, setCurrentMessage] = useState('');
  const [fullMessage, setFullMessage] = useState('');

  // 模擬珠子設計數據
  const mockBeadDesign = {
    designName: '神秘能量串珠',
    beads: [
      { name: '淺藍水晶珠', type: '水晶珠', image: 'light-blue-bead-ID17.png' },
      { name: '粉色玻璃珠', type: '玻璃珠', image: 'pink-bead-ID7.png' },
      { name: '紫色米珠', type: '米珠', image: 'dark-purple-bead-ID10.png' }
    ],
    timestamp: Date.now()
  };

  const startAnalysis = () => {
    setIsAnalyzing(true);
    setCurrentMessage('');
    setShowResult(false);

    // 模擬分析過程
    setTimeout(() => {
      const advice = '你的串珠作品展現了獨特的藝術天賦和內在智慧。淺藍色的水晶珠代表著你內在的寧靜與智慧，這種清澈的顏色象徵著你思維的清晰和溝通的優雅。粉色的溫暖色調代表著你內心的柔軟與愛心，紫色的神秘色調象徵著你內在的智慧與靈性。你的設計豐富多彩，這體現了你對生活的熱愛和對美的追求，這種積極的態度將為你帶來好運。';
      
      setFullMessage(advice);
      
      // 逐字顯示建議
      let index = 0;
      const typeWriter = () => {
        if (index < advice.length) {
          setCurrentMessage(advice.substring(0, index + 1));
          index++;
          setTimeout(typeWriter, 30);
        } else {
          setShowResult(true);
          setIsAnalyzing(false);
        }
      };
      typeWriter();
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

  const getScoreLabel = (key) => {
    const labels = {
      love: '愛情運勢',
      windfall: '偏財運勢', 
      regularIncome: '正財運勢',
      career: '事業運勢',
      health: '健康運勢'
    };
    return labels[key] || key;
  };

  const getScoreIconByType = (key) => {
    const icons = {
      love: <Favorite className="text-red-400" />,
      windfall: <TrendingUp className="text-green-400" />,
      regularIncome: <TrendingUp className="text-blue-400" />,
      career: <AutoAwesome className="text-yellow-400" />,
      health: <HealthAndSafety className="text-emerald-400" />
    };
    return icons[key];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* 頂部導航欄 */}
      <Box className="bg-black/20 backdrop-blur-lg border-b border-white/10 sticky top-0 z-50">
        <Box className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Box className="flex items-center space-x-4">
            <Tooltip title="返回主頁">
              <IconButton className="text-white hover:bg-white/10">
                <Home />
              </IconButton>
            </Tooltip>
            <Typography variant="h6" className="text-white font-bold">
              ✨ 神秘串珠評分 ✨
            </Typography>
          </Box>
          
          <Box className="flex items-center space-x-2">
            <Tooltip title="重新分析">
              <IconButton 
                className="text-white hover:bg-white/10"
                onClick={() => window.location.reload()}
              >
                <Refresh />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </Box>

      <Box className="max-w-7xl mx-auto px-6 py-8">
        <Grid container spacing={4}>
          {/* 左側：通靈師對話區 */}
          <Grid item xs={12} lg={7}>
            <Slide direction="up" in timeout={800}>
              <Card className="bg-white/5 backdrop-blur-xl border border-white/20 shadow-2xl overflow-hidden">
                <CardContent className="p-0">
                  {/* 通靈師頭像區域 */}
                  <Box className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 p-6 border-b border-white/10">
                    <Box className="flex items-center">
                      <Avatar 
                        src="/psychic-medium.jpeg" 
                        className="w-20 h-20 mr-6 border-4 border-purple-300/50 shadow-lg"
                      />
                      <Box>
                        <Typography variant="h4" className="text-purple-200 font-bold mb-2">
                          星象大師: 小乖
                        </Typography>
                        <Typography variant="body1" className="text-purple-300 flex items-center">
                          <Psychology className="mr-2" />
                          ✨ 能量分析專家 ✨
                        </Typography>
                      </Box>
                    </Box>
                  </Box>

                  {/* 對話內容區域 */}
                  <Box className="p-8">
                    {!isAnalyzing && !showResult && (
                      <Fade in timeout={500}>
                        <Box className="text-center">
                          <Box className="text-8xl mb-6 animate-bounce-gentle">
                            🔮
                          </Box>
                          <Typography variant="h5" className="text-white mb-4 font-bold">
                            歡迎來到神秘占卜殿堂
                          </Typography>
                          <Typography variant="body1" className="text-gray-300 mb-8 leading-relaxed">
                            讓我來解讀你的串珠設計，揭示其中蘊含的神秘能量...
                          </Typography>
                          <Button 
                            variant="contained" 
                            size="large"
                            onClick={startAnalysis}
                            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold px-8 py-3 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
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
                          <Box className="relative mb-6">
                            <div className="animate-spin rounded-full h-20 w-20 border-4 border-purple-400 mx-auto"></div>
                            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-pink-400 animate-spin" style={{ animationDirection: 'reverse' }}></div>
                          </Box>
                          <Typography variant="h6" className="text-purple-200 mb-2 font-bold">
                            正在解讀你的串珠作品...
                          </Typography>
                          <Typography variant="body2" className="text-purple-300">
                            水晶球正在揭示命運的奧秘...
                          </Typography>
                          <LinearProgress className="mt-6 bg-purple-900/30" />
                        </Box>
                      </Grow>
                    )}

                    {showResult && (
                      <Fade in timeout={800}>
                        <Box>
                          <Typography variant="h6" className="text-purple-200 mb-4 font-bold flex items-center">
                            <AutoAwesome className="mr-2 text-yellow-400" />
                            神秘解析結果
                          </Typography>
                          <Paper className="bg-white/5 p-6 border border-purple-300/30 backdrop-blur-sm">
                            <Typography variant="body1" className="text-gray-200 leading-relaxed text-lg">
                              {currentMessage}
                              {currentMessage.length < fullMessage.length && (
                                <span className="animate-pulse">|</span>
                              )}
                            </Typography>
                          </Paper>
                        </Box>
                      </Fade>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Slide>
          </Grid>

          {/* 右側：評分和設計展示 */}
          <Grid item xs={12} lg={5}>
            <Box className="space-y-6">
              {/* 串珠設計展示 */}
              <Slide direction="left" in timeout={1000}>
                <Card className="bg-white/5 backdrop-blur-xl border border-white/20 shadow-2xl">
                  <CardContent className="p-6">
                    <Typography variant="h6" className="text-center text-white mb-4 font-bold flex items-center justify-center">
                      <span className="mr-2">📿</span>
                      你的串珠設計
                    </Typography>
                    
                    <Box className="bg-white/5 rounded-lg p-4 border border-white/10 mb-4">
                      <Typography variant="h6" className="text-yellow-400 mb-2 font-bold text-center">
                        {mockBeadDesign.designName}
                      </Typography>
                      <Typography variant="body2" className="text-gray-300 mb-1 text-center">
                        包含 {mockBeadDesign.beads.length} 顆珠子
                      </Typography>
                      <Typography variant="body2" className="text-gray-300 text-sm text-center">
                        創建時間: {new Date(mockBeadDesign.timestamp).toLocaleString()}
                      </Typography>
                    </Box>

                    {/* 珠子預覽 */}
                    <Box className="flex justify-center space-x-2 mb-4">
                      {mockBeadDesign.beads.map((bead, index) => (
                        <Tooltip key={index} title={`${bead.name} - ${bead.type}`}>
                          <Avatar 
                            src={`/${bead.image}`}
                            className="w-12 h-12 border-2 border-purple-300/50 cursor-pointer hover:scale-110 transition-transform duration-200"
                          />
                        </Tooltip>
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              </Slide>

              {/* 能量評分雷達圖 */}
              <Slide direction="left" in timeout={1200}>
                <Card className="bg-white/5 backdrop-blur-xl border border-white/20 shadow-2xl">
                  <CardContent className="p-6">
                    <Typography variant="h6" className="text-center text-white mb-6 font-bold flex items-center justify-center">
                      <span className="mr-2">🎯</span>
                      能量評分雷達圖
                    </Typography>
                    
                    <Box className="space-y-4">
                      {Object.entries(scores).map(([key, value], index) => (
                        <Grow key={key} in timeout={200 * index}>
                          <Paper className="bg-white/5 p-4 border border-white/20 backdrop-blur-sm">
                            <Box className="flex items-center justify-between mb-3">
                              <Box className="flex items-center">
                                {getScoreIconByType(key)}
                                <Typography variant="body1" className="text-white ml-2 font-medium">
                                  {getScoreLabel(key)}
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
                            <Box className="relative">
                              <LinearProgress 
                                variant="determinate" 
                                value={value * 10} 
                                className="h-3 bg-gray-700/50 rounded-full"
                                sx={{
                                  '& .MuiLinearProgress-bar': {
                                    background: value >= 8 ? 'linear-gradient(90deg, #10B981, #34D399)' :
                                               value >= 6 ? 'linear-gradient(90deg, #F59E0B, #FBBF24)' :
                                               'linear-gradient(90deg, #EF4444, #F87171)',
                                    borderRadius: '6px'
                                  }
                                }}
                              />
                            </Box>
                          </Paper>
                        </Grow>
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              </Slide>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default ModernBeadRatingApp;

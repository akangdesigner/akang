import { useNavigate } from 'react-router-dom';

/**
 * 統一的導航 Hook
 * 用於在應用程式中進行頁面導航，避免使用 window.location.href
 */
export const useNavigation = () => {
  const navigate = useNavigate();

  const goToHome = () => {
    navigate('/home');
  };

  const goToCabinet = () => {
    navigate('/cabinet');
  };

  const goToGuide = () => {
    navigate('/guide');
  };

  const goToRating = () => {
    navigate('/rating');
  };

  const goToStores = () => {
    navigate('/stores');
  };

  const goToFortune = () => {
    navigate('/fortune');
  };

  const goToDebug = () => {
    navigate('/debug');
  };

  const goTo = (path) => {
    navigate(path);
  };

  const goBack = () => {
    navigate(-1);
  };

  return {
    goToHome,
    goToCabinet,
    goToGuide,
    goToRating,
    goToStores,
    goToFortune,
    goToDebug,
    goTo,
    goBack
  };
};

export default useNavigation;

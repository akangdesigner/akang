import React, { useState, useEffect } from 'react';
import './MyDesigns.css';
import { useNavigation } from './hooks/useNavigation';

const MyDesigns = ({ onClose, isEmbedded = false }) => {
  const { goToRating } = useNavigation();
  const [savedDesigns, setSavedDesigns] = useState([]);
  const [selectedDesign, setSelectedDesign] = useState(null);
  const [editingDesignId, setEditingDesignId] = useState(null);
  const [editingName, setEditingName] = useState('');
  

  // 從 localStorage 載入保存的設計
  useEffect(() => {
    loadSavedDesigns();
  }, []);


  const loadSavedDesigns = () => {
    try {
      const designs = [];
      // 檢查所有可能的 localStorage 鍵
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('beadDesign_')) {
          const design = JSON.parse(localStorage.getItem(key));
          if (design && design.beads) {
            designs.push({
              id: key,
              ...design
            });
          }
        }
      }
      // 按時間戳排序，最新的在前
      designs.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
      setSavedDesigns(designs);
    } catch (error) {
    }
  };

  const deleteDesign = (designId) => {
    if (window.confirm('確定要刪除這個設計嗎？')) {
      try {
        localStorage.removeItem(designId);
        setSavedDesigns(prev => prev.filter(design => design.id !== designId));
        alert('設計已刪除！');
      } catch (error) {
        alert('刪除失敗，請重試');
      }
    }
  };

  const startEditing = (designId, currentName) => {
    setEditingDesignId(designId);
    setEditingName(currentName || '');
  };

  const saveEdit = (designId) => {
    if (editingName.trim()) {
      try {
        // 更新 localStorage 中的設計名稱
        const designData = localStorage.getItem(designId);
        if (designData) {
          const design = JSON.parse(designData);
          design.designName = editingName.trim();
          localStorage.setItem(designId, JSON.stringify(design));
          
          // 更新狀態
          setSavedDesigns(prev => prev.map(design => 
            design.id === designId ? { ...design, designName: editingName.trim() } : design
          ));
        }
        setEditingDesignId(null);
        setEditingName('');
      } catch (error) {
        alert('保存失敗，請重試');
      }
    }
  };

  const cancelEdit = () => {
    setEditingDesignId(null);
    setEditingName('');
  };

  const loadDesignToRating = (design) => {
    // 將選中的設計保存到評分區的 localStorage
    localStorage.setItem('savedBeadDesign', JSON.stringify(design));
    // 跳轉到評分頁面
    goToRating();
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return '未知日期';
    const date = new Date(timestamp);
    return date.toLocaleDateString('zh-TW', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const content = (
    <div className="my-designs-content">
      {savedDesigns.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📿</div>
          <h3>還沒有保存的設計</h3>
          <p>在數位串珠創作區完成設計後，點擊「暫存設計」按鈕即可將設計保存到這裡。</p>
        </div>
      ) : (
        <div className="designs-grid">
          {savedDesigns.map((design) => (
            <div key={design.id} className="design-card">
              <div className="design-card-header">
                <div className="design-title-section">
                  {editingDesignId === design.id ? (
                    <div className="edit-name-container">
                      <input
                        type="text"
                        value={editingName}
                        onChange={(e) => setEditingName(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            saveEdit(design.id);
                          } else if (e.key === 'Escape') {
                            cancelEdit();
                          }
                        }}
                        className="edit-name-input"
                        autoFocus
                        placeholder="輸入設計名稱"
                      />
                      <div className="edit-buttons">
                        <button 
                          className="save-btn"
                          onClick={() => saveEdit(design.id)}
                          title="保存"
                        >
                          ✓
                        </button>
                        <button 
                          className="cancel-btn"
                          onClick={cancelEdit}
                          title="取消"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="title-with-edit">
                      <h4>{design.designName || '未命名設計'}</h4>
                      <button 
                        className="edit-name-btn"
                        onClick={() => startEditing(design.id, design.designName)}
                        title="編輯名稱"
                      >
                        ✏️
                      </button>
                    </div>
                  )}
                </div>
                <div className="design-actions">
                  <button 
                    className="action-btn load-btn"
                    onClick={() => loadDesignToRating(design)}
                    title="進行分析"
                  >
                    🔮 進行分析
                  </button>
                  <button 
                    className="action-btn delete-btn"
                    onClick={() => deleteDesign(design.id)}
                    title="刪除設計"
                    style={{
                      background: '#ff4444',
                      color: 'white',
                      border: 'none',
                      padding: '8px 12px',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '14px'
                    }}
                  >
                    🗑️ 刪除
                  </button>
                </div>
              </div>
              

              {/* 圓形手鍊預覽 */}
              <div className="bracelet-preview">
                <div className="bracelet-circle">
                  {/* 串珠線 */}
                  <svg 
                    className="bracelet-string" 
                    style={{
                      position: 'absolute',
                      top: '0',
                      left: '0',
                      width: '100%',
                      height: '100%',
                      zIndex: 1
                    }}
                  >
                    <circle
                      cx="50%"
                      cy="50%"
                      r={`${(() => {
                        if (design.beads?.length <= 10) return '30%';
                        if (design.beads?.length <= 15) return '35%';
                        return '40%';
                      })()}`}
                      fill="none"
                      stroke="rgba(255, 255, 255, 0.8)"
                      strokeWidth="2"
                    />
                  </svg>
                  
                  {/* 珠子 */}
                  {design.beads?.map((bead, index) => {
                    const angle = (index * 360) / design.beads.length;
                    // 根據珠子數量調整圓形半徑
                    let radius = 40;
                    if (design.beads.length <= 10) {
                      radius = 30;  // 10顆或以下用較小半徑
                    } else if (design.beads.length <= 15) {
                      radius = 35;  // 11-15顆用中等半徑
                    }
                    const x = 50 + radius * Math.cos((angle - 90) * Math.PI / 180);
                    const y = 50 + radius * Math.sin((angle - 90) * Math.PI / 180);
                    
                    // 根據珠子類型和數量決定尺寸
                    const getBeadSize = (beadType, totalBeads) => {
                      // 根據珠子數量調整基礎尺寸
                      let baseSize = 30;
                      if (totalBeads <= 10) {
                        baseSize = 40;  // 10顆或以下用更大尺寸
                      } else if (totalBeads <= 15) {
                        baseSize = 35;  // 11-15顆用中等尺寸
                      }
                      
                      // 根據珠子類型調整
                      if (beadType === '過渡珠') return `${Math.max(18, baseSize * 0.5)}px`;
                      if (beadType === '米珠') return `${Math.max(15, baseSize * 0.3)}px`;
                      if (beadType === '珍珠') return `${Math.max(18, baseSize * 0.8)}px`;
                      return `${baseSize}px`;
                    };
                    
                    
                    return (
                      <img
                        key={index}
                        src={`/${bead.image}`}
                        alt={bead.name || `珠子 ${index + 1}`}
                        className="bracelet-bead"
                        style={{
                          position: 'absolute',
                          left: `${x}%`,
                          top: `${y}%`,
                          transform: 'translate(-50%, -50%)',
                          width: getBeadSize(bead.type, design.beads.length),
                          height: getBeadSize(bead.type, design.beads.length),
                          objectFit: 'cover',
                          zIndex: 2
                        }}
                        title={`${bead.name} (${bead.type})`}
                        onError={(e) => {
                          e.target.style.backgroundColor = bead.color || '#ccc';
                          e.target.style.display = 'block';
                        }}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  if (isEmbedded) {
    return content;
  }

  return (
    <div className="my-designs-overlay">
      <div className="my-designs-modal">
        <div className="my-designs-header">
          <h2>🎨 我的設計</h2>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <button className="close-btn" onClick={onClose}>×</button>
          </div>
        </div>
        {content}
      </div>

    </div>
  );
};

export default MyDesigns;
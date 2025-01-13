import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [isRegister, setIsRegister] = useState(false); // 로그인/회원가입 화면 전환
  const [username, setUsername] = useState(''); // 사용자 이름
  const [email, setEmail] = useState(''); // 이메일
  const [password, setPassword] = useState(''); // 비밀번호
  const [profileImage, setProfileImage] = useState(''); // 프로필 이미지 URL
  const [message, setMessage] = useState(''); // 사용자 메시지
  const navigate = useNavigate();

  // 로그인 요청
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setMessage('모든 필드를 입력해주세요.');
      return;
    }

    try {
      console.log('로그인 요청 데이터:', { email, password });

      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('로그인 성공:', data);
        setMessage('로그인 성공!');
        localStorage.setItem('loggedInUser', JSON.stringify(data.user)); // 사용자 정보 저장
        navigate('/mypage'); // 마이페이지로 이동
      } else {
        console.log('로그인 실패:', data.message);
        setMessage(data.message);
      }
    } catch (error) {
      console.error('로그인 요청 실패:', error);
      setMessage('로그인 중 오류가 발생했습니다.');
    }
  };

  // 회원가입 요청
  const handleRegister = async (e) => {
    e.preventDefault();

    if (!username || !email || !password) {
      setMessage('모든 필드를 입력해주세요.');
      return;
    }

    try {
      console.log('회원가입 요청 데이터:', { username, email, password, profileImage });

      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password, profileImage }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('회원가입 성공:', data);
        setMessage('회원가입 성공!');
        setIsRegister(false); // 로그인 화면으로 전환
      } else {
        console.log('회원가입 실패:', data.message);
        setMessage(data.message);
      }
    } catch (error) {
      console.error('회원가입 요청 실패:', error);
      setMessage('회원가입 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="background">
      <div className={`login-container ${isRegister ? 'extend' : ''}`}>
        <h2>{isRegister ? '회원가입' : '로그인'}</h2>
        <form
          onSubmit={isRegister ? handleRegister : handleLogin}
          className="login-form"
        >
          {isRegister && (
            <div className="form-group">
              <label htmlFor="username">사용자 이름</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="사용자 이름"
                required
              />
            </div>
          )}
          <div className="form-group">
            <label htmlFor="email">이메일</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="이메일"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">비밀번호</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호"
              required
            />
          </div>
          {isRegister && (
            <div className="form-group">
              <label htmlFor="profileImage">프로필 이미지 URL (선택)</label>
              <input
                type="text"
                id="profileImage"
                value={profileImage}
                onChange={(e) => setProfileImage(e.target.value)}
                placeholder="프로필 이미지 URL (선택)"
              />
            </div>
          )}
          <button type="submit" className="submit-button">
            {isRegister ? '회원가입' : '로그인'}
          </button>
        </form>
        {message && <p className="message">{message}</p>}
        <button
          onClick={() => setIsRegister(!isRegister)}
          className="toggle-button"
        >
          {isRegister ? '로그인 페이지로' : '회원가입 페이지로'}
        </button>
      </div>
    </div>
  );
};

export default Login;

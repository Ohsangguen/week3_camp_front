import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Mypage.css';

const Mypage = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const loggedUser = JSON.parse(localStorage.getItem('loggedInUser'));
        if (loggedUser) {
            setUser(loggedUser);
        } else {
            navigate('/'); // 로그인 페이지로 리디렉션
        }
    }, [navigate]);

    if (!user) {
        return null; // 로딩 상태
    }

    return (
        <div className="mypage-container">
            <h1>마이페이지</h1>
            <div className="profile">
                <img
                    src={user.profile_image || 'https://via.placeholder.com/150'}
                    alt="Profile"
                    className="profile-image"
                />
                <div className="info">
                    <p><strong>이름:</strong> {user.username}</p>
                    <p><strong>이메일:</strong> {user.email}</p>
                    <p><strong>프로필 이미지 URL:</strong> {user.profile_image || '없음'}</p>
                </div>
            </div>
        </div>
    );
};

export default Mypage;

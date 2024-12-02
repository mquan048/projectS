import React, {useState, useEffect, useRef} from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import print_pic from '../../assets/print.svg';
import doingu from '../../assets/image 3.png';
import maymoi from '../../assets/image 4.png';
import nhanhchong from '../../assets/image 5.png';
import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faHouse, faChevronDown, faEnvelope, faLock, faAngleRight  } from '@fortawesome/free-solid-svg-icons';
import './Body.css';
import img_login from '../../assets/img_login-removebg-preview.png';
function Body1()
{
    const navigate = useNavigate();
    const handleStartPrinting = () => {
        navigate('/login'); // Chuyển hướng đến trang đăng nhập
    };
    return (
        <div className = "first-partBody1">
        <div className="title">
            <p className="serviceHCMUT">Dịch vụ in ấn HCMUT</p>
            <p className="On-of">Online | Ofline</p>
            <div className="only-student">
            <div className="only-student2">
            <p>Chỉ dành cho sinh viên</p>
            <p>Trường đại học Bách Khoa TP.HCM</p>
            </div>
            </div>
            <div className='button_started'>
            <button className="Getstarted"  onClick={handleStartPrinting}>BẮT ĐẦU IN</button>
            </div>
        </div>
        <div className="part_pic">
         <img src={print_pic} alt='In ấn'></img>
        </div>
        </div>
    );
}
function Effect_Body2_Body3()
{
    const [showBody2, setShowBody2] = useState(false);
    const [showBody3, setShowBody3] = useState(false);
    const body2Ref = useRef(null);
    const body3Ref = useRef(null);
    useEffect(() => 
    {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry =>
                {
                    if(entry.target === body2Ref.current && entry.isIntersecting)
                    {
                        setShowBody2(true);
                    }
                    if(entry.target === body3Ref.current && entry.isIntersecting)
                    {
                            setShowBody3(true);
                    }
                });
            },
            {threshold: 0.01}
        );
        if (body2Ref.current) {
            observer.observe(body2Ref.current);
        }
        if (body3Ref.current) {
            observer.observe(body3Ref.current);
        }
        return () => {
            if (body2Ref.current) {
                observer.unobserve(body2Ref.current);
            }
            if (body3Ref.current) {
                observer.unobserve(body3Ref.current);
            }
        };
    }, [])
    return (
        <div>
            <div ref={body2Ref} className={`slide-up ${showBody2 ? 'visible' : ''}`}>
                <Body2 />
            </div>
            <div ref={body3Ref} className={`slide-up ${showBody3 ? 'visible' : ''}`}>
                <Body3 />
            </div>
        </div>
    );
}


function Body2()
{
    return(
        <div class="section">
        <h2>Chúng tôi luôn tự hào về:</h2>
        <div class="features">
            <div class="feature-item">
                <img src={doingu} alt="Đội ngũ nhân viên tận tâm"></img>
                <h3>Đội ngũ nhân viên tận tâm</h3>
                <p>Nhân viên nhiệt tình, sẵn sàng giúp đỡ các bạn sinh viên. Luôn có đội ngũ kỹ thuật hỗ trợ, sẵn sàng khắc phục sự cố.</p>
            </div>
            <div class="feature-item">
                <img src={maymoi} alt="Máy in nhập khẩu từ Hoa Kỳ"></img>
                <h3>Máy in đời mới nhất, được nhập khẩu từ Hoa Kỳ</h3>
                <p>Thực hiện in ấn đa dạng giấy tờ, số lượng tùy ý. Màu sắc rõ ràng, full HD</p>
            </div>
            <div class="feature-item">
                <img src={nhanhchong} alt="Máy in tốc độ cao"></img>
                <h3>Máy in đến từ ngôi trường kỹ thuật top đầu Miền Nam phục vụ nhanh chóng, tiện lợi, mọi lúc mọi nơi</h3>
                <p>Cái này không cần phải bàn nha các bạn</p>
            </div>
            <div class="faAngleRight">
                <FontAwesomeIcon icon={faAngleRight}  className='icon-faAngleRight'/>
            </div>
        </div>
    </div>
    
    );
}

function Body3()
{
    return(
    <div class="timeline">
    <h2>Tiêu điểm 2024:</h2>
    <div class="timeline-item">
        <div class="circle">
            <div className="small_circle"></div>
        </div>
        <div class="text">Sự kiện 1: Mô tả sự kiện đầu tiên ở đây</div>
    </div>
    <div class="timeline-item">
    <div class="circle">
            <div className="small_circle"></div>
        </div>
        <div class="text">Sự kiện 2: Mô tả sự kiện thứ hai ở đây</div>
    </div>
    <div class="timeline-item">
    <div class="circle">
            <div className="small_circle"></div>
        </div>
        <div class="text">Sự kiện 3: Mô tả sự kiện thứ ba ở đây</div>
    </div>
</div>
    );
}
function Body_LandingPage() {
    return (
    <div>
        <Body1/>
        <Effect_Body2_Body3/>
    </div>
    )
}
export default Body_LandingPage;
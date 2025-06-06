import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FaBars } from 'react-icons/fa';

// Load custom order (in production, this could be bundled or fetched)
import customOrder from './custom_order.json'; // Create this file in src/

const AppContainer = styled.div`
  background: #1a1a1a;
  color: #ffffff;
  font-family: 'Montserrat', sans-serif;
  min-height: 100vh;
  overflow-x: hidden;
  scroll-behavior: smooth;
`;

const Header = styled.header`
  position: fixed;
  top: 0;
  width: 100%;
  background: rgba(0, 0, 0, 0.9);
  padding: 20px 40px 20px 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1000;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
  @media (max-width: 768px) {
    padding: 15px 30px 15px 20px;
  }
`;

const Logo = styled.div`
  font-size: 28px;
  font-weight: 700;
  color: #00ff99;
  letter-spacing: 1px;
  flex-shrink: 0;
  @media (max-width: 480px) {
    font-size: 20px;
  }
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  margin-right: 40px;

  ul {
    list-style: none;
    display: flex;
    margin: 0;
    padding: 0;
    flex-wrap: nowrap;
    @media (max-width: 768px) {
      display: ${props => (props.isOpen ? 'flex' : 'none')};
      flex-direction: column;
      position: absolute;
      top: 100%;
      left: 0;
      width: 100%;
      background: rgba(0, 0, 0, 0.95);
      padding: 20px 0;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
    }
  }

  li {
    margin-left: 20px;
    flex-shrink: 0;
    @media (max-width: 1200px) {
      margin-left: 15px;
    }
    @media (max-width: 768px) {
      margin: 15px 0;
    }
  }

  a {
    color: #ffffff;
    text-decoration: none;
    font-size: 16px;
    font-weight: 500;
    text-transform: uppercase;
    padding: 8px 10px;
    transition: all 0.3s ease;
    position: relative;
    white-space: nowrap;
    &:hover {
      color: #00ff99;
      &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 50%;
        width: 50%;
        height: 2px;
        background: #00ff99;
        transform: translateX(-50%);
      }
    }
    @media (max-width: 768px) {
      font-size: 18px;
      padding: 10px;
    }
  }
`;

const Hamburger = styled.div`
  display: none;
  font-size: 24px;
  color: #00ff99;
  cursor: pointer;
  margin-left: 15px;
  margin-right: 30px;
  @media (max-width: 768px) {
    display: block;
  }
`;

const Hero = styled.section`
  height: 100vh;
  background: url('https://via.placeholder.com/1920x1080?text=Studio+Image') no-repeat center/cover;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 20px;
  position: relative;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1;
  }
  > * {
    position: relative;
    z-index: 2;
  }
  h1 {
    font-size: 60px;
    font-weight: 700;
    margin-bottom: 10px;
    @media (max-width: 768px) {
      font-size: 40px;
    }
    @media (max-width: 480px) {
      font-size: 30px;
    }
  }
  p {
    font-size: 20px;
    font-weight: 300;
    color: #00ff99;
    @media (max-width: 768px) {
      font-size: 16px;
    }
  }
`;

const CategorySection = styled.section`
  padding: 60px 20px;
  text-align: center;
  background: #1a1a1a;
  scroll-margin-top: 80px;
  @media (max-width: 768px) {
    padding: 40px 15px;
  }
`;

const GearSection = styled.section`
  padding: 60px 20px;
  text-align: center;
  background: #1a1a1a;
  scroll-margin-top: 80px;
  @media (max-width: 768px) {
    padding: 40px 15px;
  }
`;

const ContactSection = styled.section`
  padding: 60px 20px;
  text-align: center;
  background: #1a1a1a;
  scroll-margin-top: 80px;
  @media (max-width: 768px) {
    padding: 40px 15px;
  }
`;

const CategoryTitle = styled.h2`
  font-size: 36px;
  font-weight: 600;
  margin-bottom: 40px;
  color: #00ff99;
  text-transform: uppercase;
  letter-spacing: 2px;
  @media (max-width: 768px) {
    font-size: 28px;
    margin-bottom: 30px;
  }
`;

const GearTitle = styled.h2`
  font-size: 36px;
  font-weight: 600;
  margin-bottom: 40px;
  color: #00ff99;
  text-transform: uppercase;
  letter-spacing: 2px;
  @media (max-width: 768px) {
    font-size: 28px;
    margin-bottom: 30px;
  }
`;

const ReelGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  max-width: 1200px;
  margin: 0 auto;
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  gap: 10px;
`;

const PageButton = styled.button`
  background: ${props => (props.active ? '#00ff99' : '#2a2a2a')};
  color: ${props => (props.active ? '#1a1a1a' : '#ffffff')};
  border: none;
  padding: 8px 16px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  border-radius: 5px;
  transition: background 0.3s ease;
  &:hover {
    background: #00ff99;
    color: #1a1a1a;
  }
`;

const GearGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  max-width: 1200px;
  margin: 0 auto;
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const Reel = styled.div`
  background: #2a2a2a;
  padding: 20px;
  border-radius: 10px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 10px 20px rgba(0, 255, 153, 0.2);
  }
  img,
  iframe {
    width: 100%;
    height: 220px;
    border: none;
    border-radius: 8px;
    object-fit: cover;
  }
  p {
    margin-top: 10px;
    font-size: 14px;
    font-weight: 400;
    color: #cccccc;
  }
`;

const GearItem = styled.div`
  background: #2a2a2a;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  h3 {
    font-size: 20px;
    font-weight: 600;
    color: #ffffff;
    margin-bottom: 10px;
  }
  ul {
    list-style: none;
    padding: 0;
    li {
      font-size: 14px;
      font-weight: 400;
      color: #cccccc;
      margin: 8px 0;
    }
  }
`;

const ContactTitle = styled.h2`
  font-size: 36px;
  font-weight: 600;
  margin-bottom: 30px;
  color: #00ff99;
  text-transform: uppercase;
  letter-spacing: 2px;
  @media (max-width: 768px) {
    font-size: 28px;
  }
`;

const ContactText = styled.p`
  font-size: 18px;
  font-weight: 300;
  color: #ffffff;
  margin: 10px 0;
  a {
    color: #00ff99;
    text-decoration: none;
    transition: color 0.3s ease;
    &:hover {
      color: #ffffff;
    }
  }
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const Footer = styled.footer`
  background: #000;
  padding: 20px;
  text-align: center;
  border-top: 1px solid #00ff99;
  p {
    font-size: 14px;
    margin: 5px 0;
    color: #aaaaaa;
  }
  a {
    color: #00ff99;
    margin: 0 10px;
    text-decoration: none;
    font-weight: 500;
    transition: color 0.3s ease;
    &:hover {
      color: #ffffff;
    }
  }
`;

const initialDemoReels = {
  liveRecordingPostProduction: [
    { url: 'https://www.youtube.com/embed/9BG38KBIwiU', title: 'Recording, Digital Editing, Mixing, Mastering' },
    { url: 'https://www.youtube.com/embed/6P-HVdMbQHE', title: 'Recording, Digital Editing, Mixing, Mastering' },
    { url: 'https://www.youtube.com/embed/qRSZQnQLHmc', title: 'Recording, Digital Editing, Mixing, Mastering' },
    { url: 'https://www.youtube.com/embed/Dj9ynl8g6R4', title: 'Recording, Digital Editing, Mixing, Mastering' },
    { url: 'https://www.youtube.com/embed/CSgHRlEyMeI', title: 'Recording, Digital Editing, Mixing, Mastering' },
    { url: 'https://www.youtube.com/embed/ph-HpeLXEP4', title: 'Recording, Digital Editing, Mixing, Mastering' },
    { url: 'https://www.youtube.com/embed/CBGAfvadmg8', title: 'Recording, Digital Editing, Mixing, Mastering' },
    { url: 'https://www.youtube.com/embed/4FXlEDW9zIc', title: 'Recording, Digital Editing, Mixing, Mastering' },
    { url: 'https://www.youtube.com/embed/Ue3LRjNjcHI', title: 'Recording, Digital Editing, Mixing, Mastering' },
    { url: 'https://www.youtube.com/embed/ot0OIzkwqqE', title: 'Recording, Digital Editing, Mixing, Mastering' },
    { url: 'https://www.youtube.com/embed/f2_NQQ3e5es', title: 'Recording, Digital Editing, Mixing, Mastering' },
    { url: 'https://www.youtube.com/embed/hxGLxaPMm0w', title: 'Recording, Digital Editing, Mixing, Mastering' },
    { url: 'https://www.youtube.com/embed/NJpqglKw1zE', title: 'Recording, Digital Editing, Mixing, Mastering' },
    { url: 'https://www.youtube.com/embed/McDRfDAkfhU', title: 'Recording, Digital Editing, Mixing, Mastering' },
    { url: 'https://www.youtube.com/embed/oMDIxXJg34Y', title: 'Recording, Digital Editing, Mixing, Mastering' },
    { url: 'https://www.youtube.com/embed/eFRqohRC1Mk', title: 'Recording, Digital Editing, Mixing, Mastering' },
    { url: 'https://www.youtube.com/embed/ws117hmBbY4', title: 'Recording, Digital Editing, Mixing, Mastering' },
    { url: 'https://www.youtube.com/embed/kkv0TWDvbxk', title: 'Recording, Digital Editing, Mixing, Mastering' },
    { url: 'https://www.youtube.com/embed/09HfLbvBIIw', title: 'Recording, Digital Editing, Mixing, Mastering' },
    { url: 'https://www.youtube.com/embed/z8W4KCb37MU', title: 'Recording, Digital Editing, Mixing, Mastering' },
    { url: 'https://www.youtube.com/embed/J9tMt_ex5Pk', title: 'Recording' },
  ],
  records: [
    { url: 'https://www.youtube.com/embed/xc9AZxR5Whs', title: 'Recording, Digital Editing, Mixing, Mastering' },
    { url: 'https://www.youtube.com/embed/HyDWYcTRzQQ', title: 'Mixing, Mastering' },
    { url: 'https://www.youtube.com/embed/2OFnMFOvyxs', title: 'Recording, Digital Editing, Mixing, Mastering' },
    { url: 'https://www.youtube.com/embed/RFoYoIT0fVk', title: 'Remixer' },
    { url: 'https://www.youtube.com/embed/c1AMRaUZJkE', title: 'Recording, Digital Editing, Mixing, Mastering' },
    { url: 'https://www.youtube.com/embed/ckoFVVnJqvE', title: 'Mixing' },
    { url: 'https://www.youtube.com/embed/VaHNvEh8pk4', title: 'Producer, Composer, Mixing, Mastering' },
    { url: 'https://www.youtube.com/embed/JG8J3anX3xM', title: 'Producer, Composer, Mixing, Mastering' },
    { url: 'https://www.youtube.com/embed/dJSKsrmVCK8', title: 'Mixing, Mastering' },
    { url: 'https://www.youtube.com/embed/dtOGN84aea4', title: 'Remixer' },
    { url: 'https://www.youtube.com/embed/6DINEBCNmOc', title: 'Remixer' },
    { url: 'https://www.youtube.com/embed/IEndCLfz6vU', title: 'Producer, Composer, Mixing, Mastering' },
    { url: 'https://www.youtube.com/embed/f_Q1fvMYiFE', title: 'Producer, Composer, Mixing, Mastering' },
    { url: 'https://www.youtube.com/embed/ehi52Fi1KT4', title: 'Producer, Composer, Mixing, Mastering' },
    { url: 'https://www.youtube.com/embed/CfahVLhBAOE', title: 'Mixing, Mastering' },

    
  ],
  liveProduction: [
    { url: 'https://www.youtube.com/embed/swM0-8jy8K4', title: 'Producer' },
    { url: 'https://www.youtube.com/embed/mvEO5rbAOz8', title: 'Sound Supervisor, Producer, Mixer' },
  ],
};

function App() {
  const [demoReels, setDemoReels] = useState(initialDemoReels);
  const [loadedVideos, setLoadedVideos] = useState({});
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [pages, setPages] = useState({
    liveRecordingPostProduction: 1,
    records: 1,
    liveProduction: 1,
  });

  const ITEMS_PER_PAGE = 9;

  useEffect(() => {
    const apiKey = process.env.REACT_APP_YOUTUBE_API_KEY;
    const fetchAndSortReelsByViews = async () => {
      const allVideoIds = Object.values(initialDemoReels)
        .flat()
        .map(reel => reel.url.split('/embed/')[1]);
      const uniqueIds = [...new Set(allVideoIds)];

      try {
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${uniqueIds.join(',')}&key=${apiKey}`
        );
        const data = await response.json();

        if (data.items) {
          const sortedData = data.items
            .map(item => ({
              id: item.id,
              viewCount: parseInt(item.statistics.viewCount || 0, 10),
              url: `https://www.youtube.com/embed/${item.id}`,
              title: initialDemoReels[
                Object.keys(initialDemoReels).find(key =>
                  initialDemoReels[key].some(reel => reel.url.includes(item.id))
                )
              ].find(reel => reel.url.includes(item.id)).title,
            }));

          const sortedReels = {
            liveRecordingPostProduction: [],
            records: [],
            liveProduction: [],
          };

          // Apply custom order if defined, otherwise sort by view count
          Object.keys(sortedReels).forEach(category => {
            const customOrderForCategory = customOrder[category] || [];
            const categoryItems = sortedData
              .filter(item => initialDemoReels[category].some(reel => reel.url.includes(item.id)))
              .sort((a, b) => {
                const aIndex = customOrderForCategory.indexOf(a.id);
                const bIndex = customOrderForCategory.indexOf(b.id);
                if (aIndex !== -1 && bIndex !== -1) {
                  return aIndex - bIndex; // Custom order
                }
                if (aIndex !== -1) return -1;
                if (bIndex !== -1) return 1;
                return b.viewCount - a.viewCount; // Fallback to view count
              });
            sortedReels[category] = categoryItems.map(item => ({
              url: item.url,
              title: item.title,
            }));
          });

          setDemoReels(sortedReels);
        }
      } catch (error) {
        console.error('Error fetching YouTube data:', error);
      }
    };

    fetchAndSortReelsByViews();
  }, []);

  const handleThumbnailClick = (category, index) => {
    setLoadedVideos(prev => ({
      ...prev,
      [`${category}-${index}`]: true,
    }));
  };

  const handleNavClick = (e) => {
    e.preventDefault();
    const targetId = e.currentTarget.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: 'smooth',
      });
    }
    setIsNavOpen(false);
  };

  const handlePageChange = (category, page) => {
    const sectionElement = document.getElementById(category === 'liveRecordingPostProduction' ? 'live-recording-post-production' : category === 'records' ? 'records' : 'live-production');
    if (sectionElement) {
      const sectionTop = sectionElement.offsetTop - 80;
      window.scrollTo({
        top: sectionTop,
        behavior: 'smooth',
      });
    }
    setPages(prev => ({
      ...prev,
      [category]: page,
    }));
  };

  const toggleNav = () => {
    setIsNavOpen(prev => !prev);
  };

  const getPaginatedReels = (category) => {
    const startIndex = (pages[category] - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return demoReels[category].slice(startIndex, endIndex);
  };

  const getPageCount = (category) => {
    return Math.ceil(demoReels[category].length / ITEMS_PER_PAGE);
  };

  return (
    <AppContainer>
      <Header>
        <Logo>BoySamSelective</Logo>
        <Nav isOpen={isNavOpen}>
          <ul>
            <li><a href="#records" onClick={handleNavClick}>Records</a></li>
            <li><a href="#live-recording-post-production" onClick={handleNavClick}>Live Recording</a></li>
            <li><a href="#live-production" onClick={handleNavClick}>Live Production</a></li>
            <li><a href="#gear-software" onClick={handleNavClick}>Gear & Software</a></li>
            <li><a href="#contact" onClick={handleNavClick}>Contact</a></li>
          </ul>
        </Nav>
        <Hamburger onClick={toggleNav}><FaBars /></Hamburger>
      </Header>

      <Hero>
        <h1>BoySamSelective</h1>
        <p>Crafting Soundscapes with Precision and Passion</p>
      </Hero>

      <CategorySection id="records">
        <CategoryTitle>Records</CategoryTitle>
        <ReelGrid>
          {getPaginatedReels('records').map((reel, index) => {
            const videoId = reel.url.split('/embed/')[1];
            const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
            const isLoaded = loadedVideos[`records-${index}`];

            return (
              <Reel key={index} onClick={() => !isLoaded && handleThumbnailClick('records', index)}>
                {isLoaded ? (
                  <iframe src={reel.url} title={reel.title} allowFullScreen></iframe>
                ) : (
                  <img src={thumbnailUrl} alt={reel.title} />
                )}
                <p>{reel.title}</p>
              </Reel>
            );
          })}
        </ReelGrid>
        <Pagination>
          {Array.from({ length: getPageCount('records') }, (_, i) => i + 1).map(page => (
            <PageButton
              key={page}
              active={pages.records === page}
              onClick={() => handlePageChange('records', page)}
            >
              {page}
            </PageButton>
          ))}
        </Pagination>
      </CategorySection>

      <CategorySection id="live-recording-post-production">
        <CategoryTitle>Live Recording & Post Production</CategoryTitle>
        <ReelGrid>
          {getPaginatedReels('liveRecordingPostProduction').map((reel, index) => {
            const videoId = reel.url.split('/embed/')[1];
            const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
            const isLoaded = loadedVideos[`liveRecordingPostProduction-${index}`];

            return (
              <Reel key={index} onClick={() => !isLoaded && handleThumbnailClick('liveRecordingPostProduction', index)}>
                {isLoaded ? (
                  <iframe src={reel.url} title={reel.title} allowFullScreen></iframe>
                ) : (
                  <img src={thumbnailUrl} alt={reel.title} />
                )}
                <p>{reel.title}</p>
              </Reel>
            );
          })}
        </ReelGrid>
        <Pagination>
          {Array.from({ length: getPageCount('liveRecordingPostProduction') }, (_, i) => i + 1).map(page => (
            <PageButton
              key={page}
              active={pages.liveRecordingPostProduction === page}
              onClick={() => handlePageChange('liveRecordingPostProduction', page)}
            >
              {page}
            </PageButton>
          ))}
        </Pagination>
      </CategorySection>

      <CategorySection id="live-production">
        <CategoryTitle>Live Production</CategoryTitle>
        <ReelGrid>
          {getPaginatedReels('liveProduction').map((reel, index) => {
            const videoId = reel.url.split('/embed/')[1];
            const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
            const isLoaded = loadedVideos[`liveProduction-${index}`];

            return (
              <Reel key={index} onClick={() => !isLoaded && handleThumbnailClick('liveProduction', index)}>
                {isLoaded ? (
                  <iframe src={reel.url} title={reel.title} allowFullScreen></iframe>
                ) : (
                  <img src={thumbnailUrl} alt={reel.title} />
                )}
                <p>{reel.title}</p>
              </Reel>
            );
          })}
        </ReelGrid>
        <Pagination>
          {Array.from({ length: getPageCount('liveProduction') }, (_, i) => i + 1).map(page => (
            <PageButton
              key={page}
              active={pages.liveProduction === page}
              onClick={() => handlePageChange('liveProduction', page)}
            >
              {page}
            </PageButton>
          ))}
        </Pagination>
      </CategorySection>

      <GearSection id="gear-software">
        <GearTitle>Gear & Software</GearTitle>
        <GearGrid>
          <GearItem>
            <h3>DAWs</h3>
            <ul>
              <li>Ableton Live</li>
              <li>Pro Tools</li>
            </ul>
          </GearItem>
          <GearItem>
            <h3>Gear</h3>
            <ul>
              <li>UAD TWIN mk2</li>
              <li>Symphony MK2</li>
              <li>Genelec 8361a Studio Monitors</li>
              <li>Barefoot Footprint 01</li>
              <li>Slate Digital VSX</li>
              <li>Neve 1073 SPX Preamps</li>
              <li>Tubetech CL1B Compressor</li>
            </ul>
          </GearItem>
        </GearGrid>
      </GearSection>

      <ContactSection id="contact">
        <ContactTitle>Contact</ContactTitle>
        <ContactText>
          Reach out for collaborations, inquiries, or bookings:
        </ContactText>
        <ContactText>
          Email: <a href="mailto:boysammgmt@gmail.com">boysammgmt@gmail.com</a>
        </ContactText>
      </ContactSection>

      <Footer>
        <p>© 2025 BoySamSelective. All Rights Reserved.</p>
        <p>
          <a href="https://www.instagram.com/boysam_/">Instagram</a> |
          <a href="https://soundcloud.com/boysam">SoundCloud</a> |
          <a href="https://open.spotify.com/artist/2XGEKduk3kkTg5xFBGsJ1A">Spotify</a> |
          <a href="mailto:boysammgmt@gmail.com">Email</a>
        </p>
      </Footer>
    </AppContainer>
  );
}

export default App;
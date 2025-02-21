import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const AppContainer = styled.div`
  background: #1a1a1a;
  color: #ffffff;
  font-family: 'Montserrat', sans-serif;
  min-height: 100vh;
  overflow-x: hidden;
`;

const Header = styled.header`
  position: fixed;
  top: 0;
  width: 100%;
  background: rgba(0, 0, 0, 0.9);
  padding: 20px 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1000;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
`;

const Logo = styled.div`
  font-size: 28px;
  font-weight: 700;
  color: #00ff99;
  letter-spacing: 1px;
`;

const Nav = styled.nav`
  ul {
    list-style: none;
    display: flex;
    li {
      margin-left: 30px;
      a {
        color: #ffffff;
        text-decoration: none;
        font-size: 16px;
        font-weight: 500;
        text-transform: uppercase;
        transition: color 0.3s ease;
        &:hover {
          color: #00ff99;
        }
      }
    }
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
  padding: 0 20px;
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
  }
  p {
    font-size: 20px;
    font-weight: 300;
    color: #00ff99;
  }
`;

const CategorySection = styled.section`
  padding: 80px 40px;
  text-align: center;
  background: #1a1a1a;
`;

const GearSection = styled.section`
  padding: 80px 40px;
  text-align: center;
  background: #1a1a1a;
`;

const CategoryTitle = styled.h2`
  font-size: 40px;
  font-weight: 600;
  margin-bottom: 50px;
  color: #00ff99;
  text-transform: uppercase;
  letter-spacing: 2px;
`;

const GearTitle = styled.h2`
  font-size: 40px;
  font-weight: 600;
  margin-bottom: 30px;
  color: #00ff99;
  text-transform: uppercase;
  letter-spacing: 2px;
`;

const ReelGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 30px;
  max-width: 1400px;
  margin: 0 auto;
`;

const GearGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const Reel = styled.div`
  background: #2a2a2a;
  padding: 20px;
  border-radius: 12px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 10px 20px rgba(0, 255, 153, 0.2);
  }
  img {
    width: 100%;
    height: 220px;
    object-fit: cover;
    border-radius: 8px;
  }
  iframe {
    width: 100%;
    height: 220px;
    border: none;
    border-radius: 8px;
  }
  p {
    margin-top: 15px;
    font-size: 16px;
    font-weight: 400;
    color: #cccccc;
  }
`;

const GearItem = styled.div`
  background: #2a2a2a;
  padding: 20px;
  border-radius: 12px;
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
      font-size: 16px;
      font-weight: 400;
      color: #cccccc;
      margin: 8px 0;
    }
  }
`;

const ContactSection = styled.section`
  padding: 60px 40px;
  text-align: center;
  background: #1a1a1a;
`;

const ContactTitle = styled.h2`
  font-size: 40px;
  font-weight: 600;
  margin-bottom: 30px;
  color: #00ff99;
  text-transform: uppercase;
  letter-spacing: 2px;
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
`;

const Footer = styled.footer`
  background: #000;
  padding: 30px 20px;
  text-align: center;
  border-top: 1px solid #00ff99;
  p {
    font-size: 14px;
    margin: 5px 0;
    color: #aaaaaa;
  }
  a {
    color: #00ff99;
    margin: 0 15px;
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
  ],
  liveProduction: [
    { url: 'https://www.youtube.com/embed/swM0-8jy8K4', title: 'Producer' },
    { url: 'https://www.youtube.com/embed/mvEO5rbAOz8', title: 'Sound Supervisor, Producer, Mixer' },
  ],
};

function App() {
  const [demoReels, setDemoReels] = useState(initialDemoReels);
  const [loadedVideos, setLoadedVideos] = useState({}); // Track which videos are loaded

  useEffect(() => {
    const apiKey = process.env.REACT_APP_YOUTUBE_API_KEY; // Use environment variable
    const fetchAndSortReelsByViews = async () => {
      const allVideoIds = Object.values(initialDemoReels)
        .flat()
        .map(reel => reel.url.split('/embed/')[1]);
      const uniqueIds = [...new Set(allVideoIds)]; // Remove duplicates if any

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
            }))
            .sort((a, b) => b.viewCount - a.viewCount); // Sort by view count, highest first

          const sortedReels = {
            liveRecordingPostProduction: [],
            records: [],
            liveProduction: [],
          };

          sortedData.forEach(item => {
            const category = Object.keys(initialDemoReels).find(key =>
              initialDemoReels[key].some(reel => reel.url === item.url)
            );
            sortedReels[category].push({ url: item.url, title: item.title });
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

  return (
    <AppContainer>
      <Header>
        <Logo>BoySamSelective</Logo>
        <Nav>
          <ul>
            <li><a href="#live-recording-post-production">Live Recording</a></li>
            <li><a href="#records">Records</a></li>
            <li><a href="#live-production">Live Production</a></li>
            <li><a href="#gear-software">Gear & Software</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </Nav>
      </Header>

      <Hero>
        <h1>BoySamSelective</h1>
        <p>Crafting Soundscapes with Precision and Passion</p>
      </Hero>

      <CategorySection id="live-recording-post-production">
        <CategoryTitle>Live Recording & Post Production</CategoryTitle>
        <ReelGrid>
          {demoReels.liveRecordingPostProduction.map((reel, index) => {
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
      </CategorySection>

      <CategorySection id="records">
        <CategoryTitle>Records</CategoryTitle>
        <ReelGrid>
          {demoReels.records.map((reel, index) => {
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
      </CategorySection>

      <CategorySection id="live-production">
        <CategoryTitle>Live Production</CategoryTitle>
        <ReelGrid>
          {demoReels.liveProduction.map((reel, index) => {
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
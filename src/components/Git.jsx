// Import necessary libraries
import { useState, useRef, useEffect } from "react";
import { Octokit } from "octokit";
import { saveAs } from "file-saver";
// import bgpic from "/img/bgpic.png";

const GitWrapApp = () => {
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState(null);
  const [mostStarredRepo, setMostStarredRepo] = useState(null);
  const [favLang, setfavLang] = useState(null);
  const [ageInYears, setAgeInYears] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);

  const canvasRef = useRef(null);
  const fetchGitHubData = async () => {
    setLoading(true);
    const octokit = new Octokit({
      auth: import.meta.env.VITE_GITHUB_TOKEN,
    });

    try {
      const { data } = await octokit.request("GET /users/{username}", {
        username,
        
      });
      const { data: reposData } = await octokit.request(
        "GET /users/{username}/repos",
        {
          username,
          per_page: 100,
        })
        const mostStarredRepo = reposData.reduce((prev, curr) => {
          return prev.stargazers_count > curr.stargazers_count ? prev : curr;
        }, {});
        // eslint-disable-next-line no-unused-vars
        const mostForkedRepo = reposData.reduce((prev, curr) => {
          return prev.forks > curr.forks ? prev : curr;
        }, {});
        // console.log(`Most forked repo is ${mostForkedRepo.name} with ${mostForkedRepo.forks} forks`);

        const languages = reposData.reduce((acc, curr) => {
          const language = curr.language;
          if (language) {
            acc[language] = (acc[language] || 0) + 1;
          }
          return acc;
        }, {});
        const mostUsedLanguage = Object.entries(languages).reduce((prev, curr) => {
          return prev[1] > curr[1] ? prev : curr;
          
        }, ["", 0]);
        // console.log(`Most used language is ${mostUsedLanguage[0]} in ${mostUsedLanguage[1]} repos`);
        
        const accountCreationDate = new Date(data.created_at);
        const currentDate = new Date();
        const ageInMilliseconds = currentDate - accountCreationDate;
        const ageInYears = Math.floor(ageInMilliseconds / (1000 * 60 * 60 * 24 * 365));
  
        // console.log(`You have been on GitHub for ${ageInYears} years.`);

      setUserData(data);
      setMostStarredRepo(mostStarredRepo);
      setfavLang(mostUsedLanguage[0]);
      setAgeInYears(ageInYears);
      console.log(data);
    } catch (error) {
      console.error("Error fetching GitHub data:", error);
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 1500);
      setUserData(null);
    } finally {
      setLoading(false);
      setUsername("")
    }
  };

  useEffect(() => {
    if (userData) {
      drawCanvas();
      document.getElementById("modal").showModal();
    }
  }, [userData]);

  const drawCanvas = async () => {
    const canvas = canvasRef.current;
    if (canvas && userData && mostStarredRepo && favLang && ageInYears) {
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
  
      const font = new FontFace("Ache", "url(/fonts/Far.otf)");
      await font.load();
      document.fonts.add(font);
  
      const bgImage = new Image();
      bgImage.src = "/img/bgpic.png";
  
      bgImage.onload = () => {
        // Draw the background image
        ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);
  
        // Draw text on top of the background
        ctx.fillStyle = "#000"; 
        ctx.font = "30px Ache"; 
        ctx.fillText(
          `GitHub Wrap for ${userData.name || userData.login}`,
          20,
          130
        );
        ctx.font = "12px Arial semibold";
        ctx.fillText(`${userData.bio || "No bio available"}`, 20, 170);
        
        ctx.fillText(
          `${userData.location || "No location available"}`,
          20,
          230
        );
        ctx.fillText(`Account created on : ${userData.created_at}`, 20, 200);
        ctx.font = "16px Arial semibold";
        ctx.fillText(`Followers:${userData.followers}`, 52, 305);
        ctx.fillText(`Repositories: ${userData.public_repos}`, 220, 305);
        ctx.fillText(`Following:${userData.following}`, 400, 305);
        ctx.fillText(`Stars⭐:${mostStarredRepo.stargazers_count || "N/A"}`, 575, 305);
        ctx.fillText(`Forks:${mostStarredRepo.forks || "N/A"}`, 765, 305);
        ctx.fillText(`${favLang}💖`, 54, 395);
        ctx.fillText(`${ageInYears} Years Old`, 230, 395);
        ctx.fillText(`Org ${userData.company || "N/A"}`, 400, 395);

        // Draw User Profile Picture with CORS handling
        if (userData.avatar_url) {
          const profilePic = new Image();
          profilePic.crossOrigin = "Anonymous";  // Enable CORS for this image
          profilePic.src = userData.avatar_url;
  
          profilePic.onload = () => {
            ctx.drawImage(profilePic, 645, 57, 210, 169);
          };
  
          profilePic.onerror = () => {
            // console.error("Error loading the profile picture with CORS.");
            setShowError(true);
            setTimeout(() => {
              setShowError(false);
            }, 1500);
          };
        }
      };
    }
  };
  
  // Modify downloadImage to wait for images to be fully loaded
  const downloadImage = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.toBlob((blob) => {
        if (blob) {
          saveAs(blob, `${username}_gitwrap.png`);
        } else {
          // console.error("Canvas could not be converted to blob.");
          setShowError(true);
          setTimeout(() => {
            setShowError(false);
          }, 1500);
        }
      });
    }
  };
  

  return (
    <div className="app-container p-20 cursor-myo" >
      
      <div className="flex flex-col items-center h-[55vh]">

        <input
          type="text"
          placeholder="Enter GitHub Username"
          className="input input-bordered input-accent w-full max-w-xs"
          value={username}
          onChange={(e) => {setUsername(e.target.value);setShowError(false);}}
        />
        <button onClick={fetchGitHubData} className="btn glass mt-2">
          Generate Wrap
        </button>
      </div>
              {/* <img src="/img/logo.png" alt="" className="absolute w-96 h-96 top-12 "/> */}
      {loading && (
        <button className="btn absolute">
          <span className="loading loading-spinner"></span>
          Something Cooked Up 🗽
        </button>
      )}
        {showError && (
        <span role="alert" className="alert alert-error mt-2 w-60 absolute">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Kya kar raha hai🥲!!</span>
        </span>
      )}
      {userData && (
        <dialog id="modal" className="modal modal-bottom sm:modal-middle">
          <div className="modal-scroll">
            <p className="pt-2">
              Press ESC key or click the button below to close
            </p>
            <div className="modal-action">
              <form method="dialog">
                <canvas
                  ref={canvasRef}
                  width={900}
                  height={500}
                  style={{ border: "1px solid black", marginTop: "20px" }}
                ></canvas>
                <button onClick={downloadImage} className="btn glass mt-2 me-4">
                  Download Wrap
                </button>
                <button className="btn">Close</button>
              </form>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default GitWrapApp;

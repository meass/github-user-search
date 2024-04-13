const token = process.env.TOKEN;
const avatar = document.querySelector('#avatar') as HTMLImageElement;
const userName = document.querySelector('#username') as HTMLHeadingElement;
const tagName = document.querySelector('#tag-name') as HTMLHeadElement;
const bio = document.querySelector('#bio') as HTMLParagraphElement;
const repo = document.querySelector('#repo') as HTMLSpanElement;
const follower = document.querySelector('#follower') as HTMLSpanElement;
const following = document.querySelector('#following') as HTMLSpanElement;
const userLocation = document.querySelector(
  '#location'
) as HTMLParagraphElement;
const twitter = document.querySelector('#twitter') as HTMLParagraphElement;
const blog = document.querySelector('#blog') as HTMLParagraphElement;
const company = document.querySelector('#company') as HTMLParagraphElement;
const createdDate = document.querySelector(
  '#created-date'
) as HTMLParagraphElement;
const searchBtn = document.querySelector('#search') as HTMLButtonElement;
const searchQuery = document.querySelector('#searchQuery') as HTMLInputElement;
const mainEle = document.querySelector('main') as HTMLDivElement;
const errEle = document.querySelector('#error') as HTMLSpanElement;
const modeBtn = document.querySelector('#modeBtn') as HTMLButtonElement;
const htmlEle = document.documentElement as HTMLElement;
const screenMode = document.querySelector('#screen-mode') as HTMLSpanElement;
const modeIcon = document.querySelector(
  '#screen-mode-icon'
) as HTMLImageElement;

async function getSearchUser(query: string) {
  try {
    const response = await fetch(`https://api.github.com/users/${query}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      if (response.status === 404) {
        errEle.classList.remove('hidden');
      }
      throw new Error('Request failed');
    }

    const data = await response.json();

    avatar.src = data.avatar_url;
    createdDate.innerHTML = `Joined ${convertDate(data.created_at)}`;
    userName.innerHTML = data.login;
    tagName.innerHTML = `@${data.login}`;
    bio.innerHTML = data.bio === null ? 'This profile has no bio' : data.bio;
    repo.innerHTML = data.public_repos;
    follower.innerHTML = data.followers;
    following.innerHTML = data.following;
    userLocation.innerHTML =
      data.location === null ? 'Not Available' : data.location;
    twitter.innerHTML =
      data.twitter_username === null ? 'Not Avialable' : data.twitter_username;
    blog.innerHTML = data.blog === '' ? 'Not Available' : data.blog;
    company.innerHTML = data.company === null ? 'Not Available' : data.company;
    mainEle.classList.remove('hidden');
    errEle.classList.add('hidden');
  } catch (error) {
    console.error('Error:');
  }
}

function convertDate(dateString: string): string {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  };
  const formattedDate = date.toLocaleDateString('en-US', options);

  return formattedDate;
}

searchBtn.addEventListener('click', function (event) {
  event.preventDefault();
  if (searchQuery.value !== '') {
    getSearchUser(searchQuery.value);
  }
});

modeBtn.addEventListener('click', function () {
  const theme = htmlEle.getAttribute('data-theme');
  if (theme === 'dark') {
    htmlEle.dataset.theme = 'light';
    screenMode.innerHTML = 'dark';
    modeIcon.src = '/assets/icon-moon.svg';
  } else {
    htmlEle.dataset.theme = 'dark';
    screenMode.innerHTML = 'light';
    modeIcon.src = '/assets/icon-sun.svg';
  }
});
// update build

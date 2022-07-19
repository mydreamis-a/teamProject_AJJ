const musicalKeywords = ["musical", "뮤지컬", "연극", "music", "뮤직", "음악"];
const searchInput = { value: "음악" };

// ㅜ 사용자의 검색어와 키워드 배열의 요소와의 일치 여부를 확인하는 함수
function checkKeywords(searchInput, keywords) {
  return keywords.some((el) => el === searchInput);
}

function checkKeywords(searchInput, keywords) {
  let result;
  keywords.forEach((el) => {
    if (el === searchInput) result = true;
    else return;
  });
  return result;
}

console.log(checkKeywords(searchInput.value, musicalKeywords));

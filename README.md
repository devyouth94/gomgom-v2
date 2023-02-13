> [리팩토링 레포지토리입니다. 기존 프로젝트 내용은 여기를 클릭해주세요!](https://github.com/devyouth94/gomgom)

# 개요

- 레거시 코드의 복잡함을 줄이고, 기존에 구현하기 어려웠던 부분의 업데이트를 진행했습니다.
- 프로젝트는 팀프로젝트였지만 리팩토링은 공부 후에 개인적으로 작업한 내용으로, 배포 사이트에는 적용 되어 있지 않습니다. 작업 사항은 전부 로컬 환경에서 적용했습니다.

# 내용

## 새로운 기술 스택 도입

- ESLint<br/>
  기존에는 prettier만 사용하여 코드 스타일을 관리했습니다. 리팩토링 하면서 ESLint를 도입하여 문법 오류를 사전에 발견하고 일관된 코드 스타일로 작성할수 있도록 했습니다.
- TypeScript<br/>
  기존에 자바스크립트로 작성된 코드를 타입스크립트로 변경하였습니다. 타입을 명시함으로써 컴파일 단계에서 에러를 먼저 잡아낼 수 있습니다.
- React Query<br/>
  서버 상태와 클라이언트 상태 관리를 나누고, 리액트 쿼리의 강력한 캐싱 기능이나 무한 스크롤 기능을 사용하기 위하여 도입했습니다. 서버 데이터는 더 fresh한 상태를 유지시키고 기존의 상태 관리 라이브러리는 클라이언트 데이터만 관리하면서 비교적 가벼워졌습니다.

## 컴포넌트를 더 잘게 나누기

- 기존의 하나의 파일에서 여러가지의 일을 하던 컴포넌트 들을 UI와 비즈니스 로직으로 분리하거나, 공통된 컴포넌트는 적극적으로 분리하여 재사용하면서 읽기 좋은 코드를 쓰기 위해 노력했습니다.

## 커스텀 훅 적극적으로 사용하기

- 재사용이 가능한 로직은 커스텀 훅으로 관리하여 중복 코드를 줄이고, 커스텀 훅 내에 로직을 추상화하여 인터페이스 컴포넌트의 코드 가독성을 높이기 위해서도 적극적으로 커스텀 훅을 도입하였습니다.

## 디렉토리 구조 변경

- 컴포넌트 분리와 커스텀 훅을 통해 파일이 많아졌고 이에 따라 도메인 별로 폴더 구조를 나누고 그 안에서 도메인 별로 components와 hook, page등을 관리할 수 있게 변경하였습니다.

## 새롭게 구현한 내용

- 드롭다운 메뉴 최적화<br/>
  이제 드롭다운 메뉴 이외의 화면을 누르면 드롭다운 메뉴를 접을 수 있습니다.
- 카테고리 및 검색 결과 유지<br/>
  새로고침을 하기 전에는 유저가 설정한 모든 데이터값이 유지 됩니다. 설정한 결과에 따른 투표글만 편하게 모아볼 수 있습니다.
- 유저의 스크롤 위치 기억<br/>
  투표글 상세 페이지에 들어갔다가 다시 나와도 유저가 이전에 보고 있던 위치로 다시 돌아옵니다. 기존에 보던 투표글까지 가려고 스크롤을 다시 내리지 않아도 됩니다.
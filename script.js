$(document).ready(function () {
  $("form").submit(function (event) {
    event.preventDefault();
    // 새로운 검색 요청 시, 기존 컨텐츠 제거
    const contents = $(".container").children();
    contents.remove();

    // 1. input id를 통한 접근
    const inputData = $("#query").val();
    // 2. input name을 통한 접근, <form> submit 전송시 사용.
    const inputDataWithName = $("input[name=q]").val();
    const container = $(".container");

    $.ajax({
      method: "get",
      url: "https://dapi.kakao.com/v3/search/book?target=title",
      data: { query: inputData },
      headers: { Authorization: "KakaoAK b8914b3fad54a304898032f492296a4f" },
      error: function (xhr, status, error) {
        alert(error);
      },
      success: function (json) {
        const documents = json.documents;

        documents.forEach(document => {
          const { authors, title, contents, sale_price, thumbnail } = document;
          // authors의 타입은 배열임.
          const authorsToString = authors.join(', ');
          container.append("<img src=" + thumbnail + ">");
          container.append("<strong>" + title + "</strong>");
          container.append("<p>" + contents + "</p>");
          container.append("<p>" + sale_price + "</p>");
          container.append("<p>" + authorsToString + "</p>");
        })
      }
    })
  })
})





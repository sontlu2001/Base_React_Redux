# RTK query dùng các createApi
- Với createApi chúng ta gọi là `slice api`
- Chúng ta sẽ khai báo `baseUrl` và các `endpoints`. 
- `baseQuery` được dùng cho mỗi endpoint để fetch api
- `fetchBaseQuery` là một function nhỏ được xây dựng trên fetch API
=> Nó không thay thế hoàn toàn được Axios nhưng sẽ giải quyết được hầu hết các vấn đề của bạn

## endPoints là gì ?
 **endPoints** là tập hợp những method giúp get, post, put, delete... tương tác với server. Khi khai báo endPoints nó sẽ sinh ra cho chúng ta các hook tương ứng để dùng trong component

Endpoints có **2 kiểu** là `query` và `mutation`.
- Query: Thường dùng cho GET
- Mutation: Thường dùng cho các trường hợp thay đổi dữ liệu trên server như POST, PUT, DELETE
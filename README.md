# NavLink
Tính năng `NavLink` là một thành phần trong thư viện **react-router-dom**, một thư viện được sử dụng phổ biến trong React để quản lý việc điều hướng trang web. NavLink được sử dụng để tạo các liên kết (links) dẫn đến các route (đường dẫn) trong ứng dụng của bạn, và nó cung cấp một số tính năng hữu ích so với thành phần Link cơ bản.

Điểm khác biệt chính giữa `NavLink` và `Link` là tính năng "active". Khi người dùng đang ở trang được liên kết bởi NavLink, nó sẽ tự động cung cấp một số hiệu ứng hoặc lớp CSS để chỉ ra trạng thái hiện tại, giúp người dùng biết mình đang ở đâu trong ứng dụng. Điều này hữu ích để tạo trải nghiệm điều hướng dễ hiểu và thân thiện hơn.

Dưới đây là một số tính năng chính của NavLink:

- **activeClassName và activeStyle**: Bạn có thể sử dụng prop `activeClassName` để chỉ định tên lớp CSS sẽ được thêm vào `NavLink` khi nó đang ở trạng thái kích hoạt. Hoặc bạn có thể sử dụng prop activeStyle để chỉ định các kiểu CSS sẽ được áp dụng.

- **isActive**: `NavLink` cho phép bạn tự định nghĩa quy tắc để xác định liệu nó có nên được coi là đang ở trạng thái kích hoạt hay không, bằng cách sử dụng prop `isActive`. Điều này cung cấp sự linh hoạt lớn hơn khi bạn muốn tùy chỉnh hành vi kích hoạt của liên kết dựa trên điều kiện đặc biệt.

- **exact**: Prop `exact` khi được đặt thành `true` sẽ chỉ kích hoạt liên kết khi URL trùng khớp hoàn toàn với `to` prop của `NavLink`. Nếu không, nó sẽ được kích hoạt nếu URL khớp bất kỳ phần nào của `to` prop.

- **strict**: Khi `strict` được đặt thành `true`, liên kết chỉ sẽ kích hoạt khi URL khớp hoàn toàn với to prop. Nếu không, các tham số URL dư thừa không được phép.

- **location**: Bạn có thể cung cấp một đối tượng `location` để định rõ vị trí hiện tại thay vì sử dụng ` window.location`. Điều này hữu ích khi bạn muốn thử nghiệm các trạng thái điều hướng trong môi trường kiểm thử.
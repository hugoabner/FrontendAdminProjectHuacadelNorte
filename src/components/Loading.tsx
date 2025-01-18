import { LoadingOverlay } from "@mantine/core"
import '../styles/loading.css';
const Loading = ({ visible }: { visible: boolean }) => {
  return (
    <div className="custom-loading">
    <LoadingOverlay
      visible={visible}
      zIndex={1000}
      overlayProps={{ radius: 'sm', blur: 2 }}
      loaderProps={{ color: 'blue', type: 'bars', size: 'md' }}
      className="custom-loading-overlay"
    />
  </div>
  )
}

export default Loading

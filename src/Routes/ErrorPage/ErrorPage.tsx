export interface IErrorPageProps {
  errorMessage?: string;
}

export const ErrorPage: React.FC<IErrorPageProps> = ({ errorMessage }) => {
  return (
    <div className="error-container">
      <p className="error-message">{errorMessage}</p>
    </div>
  );
};

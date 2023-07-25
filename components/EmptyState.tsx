interface EmptyStateProps {
  baseColor: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ baseColor }) => {
  return (
    <h3
      className="text-4xl font-bold tracking-wider"
      style={{ color: baseColor }}
    >
      Login or Register to start playing
    </h3>
  );
};

export default EmptyState;

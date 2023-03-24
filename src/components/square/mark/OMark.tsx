const OMark = ({ width }) => {
  return (
    <>
      <div
        style={{
          borderRadius: 100,
          borderWidth: 2,
          borderColor: "black",
          width: `${width}`,
        }}
      >
        {width}
      </div>
    </>
  );
};

export default OMark;

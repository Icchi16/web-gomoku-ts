const OMark = ({ width }) => {
  return (
    <>
      <div
        style={{
          borderRadius: 100,
          borderWidth: 2,
          borderColor: "black",
          width: innerWidth,
          height: innerHeight,
        }}
      >
        {width}
      </div>
    </>
  );
};

export default OMark;

import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchCoins } from "../api";
import { useRecoilState } from "recoil";
import { isDarkAtom } from "../atoms";
import { ICoin } from "../interface";
import { MdOutlineDarkMode, MdLightMode } from "react-icons/md";

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CoinsList = styled.ul`
  list-style: none;
`;

const Coin = styled.li`
  background-color: ${(props) => props.theme.bgColor};
  color: ${(props) => props.theme.textColor};
  border: 2px solid ${(props) => props.theme.textColor};
  border-radius: 15px;
  margin-bottom: 10px;
  a {
    display: flex;
    align-items: center;
    padding: 20px;
    transition: color 0.2s ease-in;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const Title = styled.h1`
  margin-left: 50px;
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.div`
  text-align: center;
`;

const Img = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
`;

const Button = styled.button`
  margin-left: 20px;
  border-radius: 50px;
  cursor: pointer;
  background-color: ${(props) => props.theme.bgColor};
  border-color: ${(props) => props.theme.textColor};
`;

const DarkMode = styled(MdOutlineDarkMode)`
  font-size: 22px;
  color: white;
`;

const LightMode = styled(MdLightMode)`
  font-size: 22px;
`;

function Coins() {
  const [isDark, setDarkAtom] = useRecoilState(isDarkAtom);
  const toggleDarkAtom = () => setDarkAtom((current) => !current);
  const { isLoading, data } = useQuery<ICoin[]>("allCoins", fetchCoins);
  // useQuery 사용 전
/*   const [coins, setCoins] = useState<ICoin[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async() => {
      const json = await((await fetch("https://api.coinpaprika.com/v1/coins")).json());
      setCoins(json.slice(0, 100));
      setLoading(false);
    })();
  }, []); */
  return (
    <Container>
      <Header>
        <Title>🤑Coins🤑</Title>
        <Button onClick={toggleDarkAtom}>{isDark ? <DarkMode /> : <LightMode />}</Button>
      </Header>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <CoinsList>
          {data?.slice(0, 100).map((coin) => (
            <Coin key={coin.id}>
              <Link
                to={{
                  pathname: `/${coin.id}`,
                  state: { name: coin.name }
                }}
              >
                <Img src={`https://static.coinpaprika.com/coin/${coin.id}/logo.png`} />
                {coin.name} &rarr;
              </Link>            
            </Coin>
          ))}
        </CoinsList>
      )}    
    </Container>
  )
}

export default Coins;
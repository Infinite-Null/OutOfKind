import { Navbar, Text, Avatar, Dropdown} from "@nextui-org/react";
import Link from "next/link";
import { Layout } from "./Layout";
import { useSession,signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
export default function MainScreenNav() {
  const collapseItems = [
    "Community",
    "Search",
    "Create",];
  const Data:any=useSession()
  const ref:any = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => isOpen && ref.current!.click();
  function userProfile(email:string){
     const router=useRouter()
    return <Dropdown placement="bottom-right">
    <Navbar.Item>
      <Dropdown.Trigger>
        <Avatar
          bordered
          as="button"
          color="secondary"
          size="md"
          src="https://media.istockphoto.com/id/1208175274/vector/avatar-vector-icon-simple-element-illustrationavatar-vector-icon-material-concept-vector.jpg?s=612x612&w=0&k=20&c=t4aK_TKnYaGQcPAC5Zyh46qqAtuoPcb-mjtQax3_9Xc="
        />
      </Dropdown.Trigger>
    </Navbar.Item>
    <Dropdown.Menu
      aria-label="User menu actions"
      color="secondary"
      onAction={(actionKey) => {
        if(actionKey==="logout"){
          signOut()
        }
      }}
    >
      <Dropdown.Item key="profile" css={{ height: "$18" }}>
        <Text b color="inherit" css={{ d: "flex" }}>
          Signed in as
        </Text>
        <Text b color="inherit" css={{ d: "flex" }}>
          {email}
        </Text>
      </Dropdown.Item>
      <Dropdown.Item key="logout" withDivider color="error">
        Log Out
      </Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
  }
  return (
    <Layout>
      <Navbar isBordered variant="sticky">
        <Navbar.Toggle showIn="xs" ref={ref}
          onChange={(isSelected:any) => setIsOpen(()=>isSelected)}/>
        <Text b>Donate With Kind</Text>
        <Navbar.Content
          enableCursorHighlight
          activeColor="secondary"
          hideIn="xs"
          variant="highlight-rounded"
        >
          <Link style={{
            padding:"2px",
            fontSize:"20px",
            paddingLeft:"20px",
            color:"black"
          }} href="/">Home</Link>
          <Link style={{
            padding:"2px",
            fontSize:"20px",
            paddingLeft:"20px",
            color:"black"
          }} href="/Create">Create</Link>
          <Link style={{
            padding:"2px",
            fontSize:"20px",
            paddingLeft:"20px",
            color:"black"
          }} href="/community">Community</Link>
          <Link style={{
            padding:"2px",
            fontSize:"20px",
            paddingLeft:"20px",
            color:"black"
          }} href="/Search">Search</Link>
        </Navbar.Content>
        <Navbar.Content
          css={{
            "@xs": {
              w: "12%",
              jc: "flex-end",
            },
          }}
        >
          {(Data.status!=='loading')&&(Data.status==='authenticated')?userProfile(Data?.data?.user?.email??""):<Link href={'/Login'}>Login</Link>}
        </Navbar.Content>
        <Navbar.Collapse >
          {collapseItems.map((item, index) => (
            <Navbar.CollapseItem
              key={item}
              activeColor="secondary"
              css={{
                color: index === collapseItems.length - 1 ? "$error" : "",
              }}
              isActive={index === 2}
            >
              <Link
              onClick={handleClick}
                color="inherit"
                href={(item=='Community')?"/community":`/${item}`}>
                {item}
              </Link>
            </Navbar.CollapseItem>
          ))}
        </Navbar.Collapse>
      </Navbar>
    </Layout>
  );
}
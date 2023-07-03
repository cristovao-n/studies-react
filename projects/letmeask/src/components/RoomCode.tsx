import copyIMG from '../assets/images/copy.svg';

import '../styles/room-code.scss';

type RoomCodeProps = {
  code: string;
}


export function RoomCode(props: RoomCodeProps) {

  function copyRoomCodeToClipboard() {

    window.navigator.clipboard.writeText(props.code);
  }



  return (
    <button className="room-code" onClick={copyRoomCodeToClipboard}>
      <div>
        <img src={copyIMG} alt="Copiar código da sala" />
      </div>
      <span>{props.code}</span>
    </button>
  );
}
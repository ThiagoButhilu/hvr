import { House } from './house';
import { Room } from './room';

export const houseData: House[] = [
    new House(
        1,
        "H001",
        "Casa de Praia",
        "https://plantasdecasas.com/wp-content/uploads/2014/07/309-Projetos-de-casas-esq.jpg",
        {
            street: "Avenida do Mar",
            city: "Rio de Janeiro",
            state: "RJ",
            zip: "22010-000"
        }
    ),
    new House(
        2,
        "H002",
        "Casa de Campo",
        "https://tuacasa.uol.com.br/wp-content/uploads/2019/06/fachadas-de-casas-simples-0.png",
        {
            street: "Estrada do Sol",
            city: "Teresópolis",
            state: "RJ",
            zip: "25960-000"
        }
    )
];

const house1 = houseData[0];
house1.addRoom(new Room(1, "Sala de Estar", "https://zaer360.com.br/wp-content/uploads/2016/07/vantagens-de-ter-um-tour-360-graus.jpg"));
house1.addRoom(new Room(2, "Cozinha", "https://www.kadufotografo.com/wp-content/uploads/2020/04/Fotografia-Virtual-360-Graus-thumb.jpg"));
house1.addRoom(new Room(3, "Quarto Principal", "https://astronautasfilmes.com.br/wp-content/uploads/2018/02/484-1110x508-920x508.jpg"));
house1.addRoom(new Room(4, "Banheiro", "https://www.shutterstock.com/image-illustration/3drender-panorama-360-bathroom-round-600nw-2287655033.jpg"));
house1.setStatus(1); // Publicado


const house2 = houseData[1];
house2.addRoom(new Room(1, "Sala de Jantar", "https://zaer360.com.br/wp-content/uploads/2016/07/vantagens-de-ter-um-tour-360-graus.jpg"));
house2.addRoom(new Room(2, "Cozinha Gourmet", "https://www.kadufotografo.com/wp-content/uploads/2020/04/Fotografia-Virtual-360-Graus-thumb.jpg"));
house2.addRoom(new Room(3, "Quarto de Hóspedes", "https://astronautasfilmes.com.br/wp-content/uploads/2018/02/484-1110x508-920x508.jpg"));
house2.addRoom(new Room(4, "Banheiro Social", "https://www.shutterstock.com/image-illustration/3drender-panorama-360-bathroom-round-600nw-2287655033.jpg"));


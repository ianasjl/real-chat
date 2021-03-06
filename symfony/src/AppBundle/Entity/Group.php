<?php
/**
 * Created by PhpStorm.
 * User: ianas
 * Date: 08.05.2018
 * Time: 18:29
 */

namespace AppBundle\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;
use Doctrine\ORM\Mapping\ManyToOne;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use JMS\Serializer\Annotation as JMSSerializer;

/**
 * @ORM\Entity
 * @ORM\Table(name="group")
 * @UniqueEntity("groupname")
 * @JMSSerializer\ExclusionPolicy("all")
 */
class Group implements \JsonSerializable
{

    /**
     * @ORM\Column(type="guid")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="UUID")
     * @JMSSerializer\Expose
     * @JMSSerializer\Type("string")
     * @JMSSerializer\Groups({"groups_all"})
     */
    private $id;

    /**
     * @var string The username of the chat
     * @JMSSerializer\Expose
     * @ManyToOne(targetEntity="Groups", inversedBy="groupsArray")
     * @JMSSerializer\Type("string")
     * @JMSSerializer\Groups({"groups_all"})
     * @ORM\Column(type="string", length=25, unique=true)
     */
    private $groupname;

    /**
     * Specify data which should be serialized to JSON
     * @link http://php.net/manual/en/jsonserializable.jsonserialize.php
     * @return mixed data which can be serialized by <b>json_encode</b>,
     * which is a value of any type other than a resource.
     * @since 5.4.0
     */
    public function jsonSerialize()
    {
        return [
            'id'    => $this->groupId,
            'groupname' => $this->groupname,
        ];
    }

    /**
     * Get groupId.
     *
     * @return int
     */
    public function getGroupId()
    {
        return $this->groupId;
    }

    /**
     * Set groupname.
     *
     * @param string $groupname
     *
     * @return Group
     */
    public function setGroupname($groupname)
    {
        $this->groupname = $groupname;

        return $this;
    }

    /**
     * Get groupname.
     *
     * @return string
     */
    public function getGroupname()
    {
        return $this->groupname;
    }

    /**
     * Get id.
     *
     * @return string
     */
    public function getId()
    {
        return $this->id;
    }
}
